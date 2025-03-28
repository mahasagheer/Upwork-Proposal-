"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { logout } from '@/app/logout/actions';

export default function PrivatePageClient() {
  const [projectDescription, setProjectDescription] = useState('');
  const [proposal, setProposal] = useState('');
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Fetch all proposals on component mount
  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/generate-proposal');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch proposals');
      }
  
      // Ensure we have an array with the expected structure
      const formattedProposals = Array.isArray(data) 
        ? data.map(item => ({
            id: item.id || Math.random().toString(36).substring(2, 9),
            description: item.description || 'No description',
            content: item.content || item.proposal || '',
            createdAt: item.createdAt || new Date().toISOString()
          }))
        : [];
      
      // Merge with existing proposals, removing duplicates
      setProposals(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const newItems = formattedProposals.filter(p => !existingIds.has(p.id));
        return [...newItems, ...prev];
      });
      
      setError(null);
    } catch (err) {
      setError(err.message);
      setProposals([]);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateProposal = async () => {
    if (!projectDescription.trim()) {
      setError('Please enter a project description');
      return;
    }
  
    setIsLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      const response = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: projectDescription, assistant_id: "" }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate proposal');
      }
  
      setProposal(data.content || data.proposal || '');
      setSuccess('Proposal generated successfully!');
      
      // Immediately add the new proposal to the local state
      const newProposal = {
        id: data.id || Math.random().toString(36).substring(2, 9),
        description: projectDescription,
        content: data.content || data.proposal || '',
        createdAt: new Date().toISOString()
      };
      
      setProposals(prev => [newProposal, ...prev]);
      
      // Still call fetchProposals to ensure we have the latest from the server
      fetchProposals();
    } catch (err) {
      setError(err.message);
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProposal = async () => {
    if (!proposal.trim() || !editingId) return;
  
    setIsLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      const response = await fetch(`/api/generate-proposal/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: proposal }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update proposal');
      }
  
      setSuccess('Proposal updated successfully!');
      setEditingId(null);
      fetchProposals(); // Refresh the list
    } catch (err) {
      setError(err.message);
      console.error('Update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProposal = async (id) => {
    if (!id || !confirm('Are you sure you want to delete this proposal?')) return;
  
    try {
      const response = await fetch(`/api/generate-proposal/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete proposal');
      }
  
      setSuccess('Proposal deleted successfully!');
      if (editingId === id) {
        setEditingId(null);
        setProposal('');
      }
      fetchProposals(); // Refresh the list
    } catch (err) {
      setError(err.message);
      console.error('Delete error:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProposal();
    } else {
      generateProposal();
    }
  };

  const copyToClipboard = () => {
    if (!proposal) return;
    navigator.clipboard.writeText(proposal);
    setSuccess('Proposal copied to clipboard!');
  };

  const loadProposalForEditing = (proposal) => {
    if (!proposal) return;
    
    setProjectDescription(proposal.description || '');
    setProposal(proposal.content || '');
    setEditingId(proposal.id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearForm = () => {
    setProjectDescription('');
    setProposal('');
    setEditingId(null);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Freelance Proposal Generator</title>
        <meta name="description" content="Generate professional freelance proposals in seconds" />
      </Head>

      <div className="max-w-7xl mx-auto">
        <form action={logout}>
        <button type="submit">Logout</button>
        </form>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Freelance Proposal Generator
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Create winning proposals in seconds. Save, edit, and manage all your proposals in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-xl rounded-xl p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    placeholder="Paste the project details here (e.g., 'Need a Next.js e-commerce site with Stripe payments')"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  {editingId && (
                    <button
                      type="button"
                      onClick={clearForm}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className={`px-6 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ${editingId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-indigo-600 hover:bg-indigo-700'} shadow-md`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {editingId ? 'Updating...' : 'Generating...'}
                      </>
                    ) : editingId ? 'Update Proposal' : 'Generate Proposal'}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{success}</p>
                    </div>
                  </div>
                </div>
              )}

              {proposal && !isLoading && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      {editingId ? 'Editing Proposal' : 'Generated Proposal'}
                    </h2>
                    <div className="flex space-x-3">
                      <button
                        onClick={copyToClipboard}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                      >
                        <svg className="-ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 prose max-w-none">
                    {proposal.split('\n').map((line, i) => (
                      <p key={i} className="mb-3">
                        {line.startsWith('**') ? (
                          <strong>{line.replace(/\*\*/g, '')}</strong>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>

                  <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <span>Character count: {proposal.length}</span>
                    <span>Words: {proposal.trim().split(/\s+/).length}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Saved Proposals */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-xl rounded-xl p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Saved Proposals</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {proposals.length} saved
                </span>
              </div>

              {isLoading && proposals.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="animate-spin mx-auto h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Loading proposals...</p>
                </div>
              ) : proposals.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No proposals yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Generate your first proposal to see it here.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {proposals.map((item) => {
                    if (!item) return null;
                    
                    const description = item.description || 'No description';
                    const content = item.content || '';
                    const date = item.createdAt ? new Date(item.createdAt) : new Date();
                    const id = item.id || Math.random().toString(36).substring(2, 9);

                    return (
                      <li key={id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {description.substring(0, 50)}{description.length > 50 ? '...' : ''}
                          </h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => loadProposalForEditing(item)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => deleteProposal(id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {date.toLocaleDateString()}
                        </p>
                        <div className="mt-2 flex justify-between text-xs text-gray-500">
                          <span>{content.length} chars</span>
                          <span>{content.trim().split(/\s+/).length} words</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}