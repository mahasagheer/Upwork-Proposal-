import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const maxLength = 1000;

// In-memory storage for demonstration (replace with database in production)
const proposalsStorage = new Map();

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      // Return all proposals if no ID specified
      const allProposals = Array.from(proposalsStorage.values());
      return new Response(JSON.stringify({ proposals: allProposals }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get specific proposal by ID
    if (proposalsStorage.has(id)) {
      return new Response(JSON.stringify({ proposal: proposalsStorage.get(id) }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: 'Proposal not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('GET error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to retrieve proposal(s)',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(req) {
  try {
    const { description, assistant_id } = await req.json();
    
    if (!description) {
      return new Response(JSON.stringify({ error: 'Description is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Step 1: Summarize if needed
    let processedDescription = description;
    const maxLength = 500; // Added missing maxLength definition
    
    if (description.length > maxLength) {
      const summaryResponse = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "Summarize this project description in under 500 characters, focusing on key requirements and goals.",
          },
          { role: "user", content: description },
        ],
        max_tokens: 150,
        temperature: 0.3
      });
      processedDescription = summaryResponse.choices[0].message.content;
    }

    // Step 2: Create thread and run with code interpreter
    // const thread = await openai.beta.threads.create();
    
    // Add the project description as a message to the thread
    // await openai.beta.threads.messages.create(
    //   thread.id,
    //   {
    //     role: "user",
    //     content: processedDescription,
    //     tools: [{ type: "code_interpreter" }] // Attach code interpreter to the message
    //   }
    // );

    // Create and stream the run with code interpreter
    // const runStream = openai.meta.threads.runs.stream(thread.id, {
    //   assistant_id: assistant.id, // Make sure you have assistant.id defined
    //   tools: [{ type: "code_interpreter" }] // Enable code interpreter for this run
    // });

    let codeInterpreterOutput = '';
    
    // Handle the stream events
    // for await (const event of runStream) {
    //   if (event.event === 'thread.run.step.created') {
    //     if (event.data.step_details.type === 'tool_calls') {
    //       const toolCalls = event.data.step_details.tool_calls;
    //       for (const toolCall of toolCalls) {
    //         if (toolCall.type === 'code_interpreter') {
    //           if (toolCall.code_interpreter.input) {
    //             codeInterpreterOutput += `\nCode input:\n${toolCall.code_interpreter.input}\n`;
    //           }
    //           if (toolCall.code_interpreter.outputs) {
    //             codeInterpreterOutput += "\nOutput:\n";
    //             toolCall.code_interpreter.outputs.forEach(output => {
    //               if (output.type === "logs") {
    //                 codeInterpreterOutput += `${output.logs}\n`;
    //               } else if (output.type === "image") {
    //                 codeInterpreterOutput += `[Image output generated]\n`;
    //               }
    //             });
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    // Step 3: Generate proposal with code interpreter results if any

    // const file = await openai.files.create({
    //   file: fs.createReadStream("revenue-forecast.csv"),
    //   purpose: "assistants",
    // });
    const proposalResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `
          You are an expert freelance proposal writer specializing in creating compelling, conversion-focused proposals. 
          Generate a professional proposal that strictly follows these guidelines:
        
          1. **Hook (First 2 lines - MUST grab attention):**
             - Start with a powerful benefit-driven statement or thought-provoking question
             - Example: "Want to increase conversions by 30%? Let's build a high-performance store together!"
             - Avoid generic openings like "I saw your project..."
        
          2. **Scope (Clear deliverables):**
             - Specify exactly what you'll deliver in 1-2 concise sentences
             - Include key technical details if relevant
             - Example: "I'll develop a Next.js e-commerce site with Stripe integration, product filtering, and mobile-optimized checkout."
        
          3. **Unique Value Proposition (What sets you apart):**
             - Highlight 1-2 key differentiators
             - Example: "As a Shopify Plus certified developer, I'll ensure enterprise-grade scalability."
        
          4. **CTA (Strong call-to-action):**
             - Create urgency with time-sensitive language
             - Example: "Let's schedule a call today to discuss how we can launch within 2 weeks!"
        
          Additional Requirements:
          - Strict 350 character limit (count includes all formatting)
          - Use **bold** section headers exactly as shown
          - Maintain professional yet enthusiastic tone
          - Address potential client objections implicitly
          - Include relevant emojis sparingly (max 2-3)
          - Never make unrealistic promises
        
          Example Structure:
          **Hook:** 🚀 Want to 3X your online sales? Let's build your high-converting store!
          **Scope:** Complete Next.js frontend with Shopify integration, optimized checkout flow.
          **Why Me:** 5+ years building 50+ e-commerce sites with 98% client satisfaction.
          **CTA:** Message me to start next week - first 3 clients get 10% off!
          `
        },
        { 
          role: "user", 
          content: `Project: ${processedDescription}\n\nCode Interpreter Analysis:\n${codeInterpreterOutput || 'No code analysis needed'}` 
        }
      ],
      max_tokens: 200,
      temperature: 0.5
    });

    const proposal = proposalResponse.choices[0].message.content;
    const proposalId = Date.now().toString();
    
    // Store the proposal (assuming proposalsStorage is defined)
    // Added validation for proposalsStorage existence
    if (!proposalsStorage) {
      console.warn('proposalsStorage is not defined - skipping storage');
    } else {
      proposalsStorage.set(proposalId, {
        id: proposalId,
        description: processedDescription,
        content: proposal, // Changed from 'proposal' to 'content' to match frontend expectation
        codeAnalysis: codeInterpreterOutput,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    return new Response(JSON.stringify({ 
      content: proposal, // Changed from 'proposal' to 'content' for consistency
      id: proposalId,
      description: processedDescription, // Added description to response
      codeAnalysis: codeInterpreterOutput,
      createdAt: new Date().toISOString() // Added creation timestamp
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('OpenAI error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate proposal',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PATCH(req) {
  try {
    const { id, updates } = await req.json();
    
    if (!id || !updates) {
      return new Response(JSON.stringify({ error: 'ID and updates are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!proposalsStorage.has(id)) {
      return new Response(JSON.stringify({ error: 'Proposal not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const existingProposal = proposalsStorage.get(id);
    const updatedProposal = {
      ...existingProposal,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    proposalsStorage.set(id, updatedProposal);
    
    return new Response(JSON.stringify({ proposal: updatedProposal }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('PATCH error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to update proposal',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!proposalsStorage.has(id)) {
      return new Response(JSON.stringify({ error: 'Proposal not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    proposalsStorage.delete(id);
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Proposal deleted successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to delete proposal',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}