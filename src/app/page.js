import Image from "next/image";
import { ArrowRight, FileText, Users, Zap, Star, BarChart, Shield, Check, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import LandingImage from "../../public/section5_proposal_maker.webp"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-[#f2fdff]/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#564787]" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#564787] to-[#564787] bg-clip-text text-transparent">
              ProposalPro
            </span>
          </div>
          <div className="flex items-center gap-4">
          <Button asChild className="bg-gradient-to-r from-[#564787] to-[#564787] hover:from-[#564787]/90 hover:to-[#564787]/90 shadow-lg hover:shadow-[#564787]/30">
              <Link href="/chat">Chat</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-[#564787] to-[#564787] hover:from-[#564787]/90 hover:to-[#564787]/90 shadow-lg hover:shadow-[#564787]/30">
              <Link href="/login">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative bg-gradient-to-br from-[#f2fdff] via-[#564787]/5 to-[#564787]/5">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#564787]/20 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#564787]/20 rounded-full filter blur-3xl animate-float-delay"></div>
          </div>
          <div className=" px-4 md:px-[5%] relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4 animate-fadeIn">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[#564787]/10 text-[#564787] ring-1 ring-[#564787]/20 animate-pulse">
                    <Rocket className="h-4 w-4 mr-2" />
                    Freelancer s Best Friend
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-[#101935] to-[#564787] bg-clip-text text-transparent">
                    Create Winning Proposals in Minutes
                  </h1>
                  <p className="max-w-[600px] text-[#101935]/80 md:text-xl">
                    ProposalPro helps freelancers create professional proposals that win clients and grow your business.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Button
                    size="lg"
                    className="px-8 shadow-lg bg-gradient-to-r from-[#564787] to-[#564787] hover:from-[#564787]/90 hover:to-[#564787]/90 hover:shadow-[#564787]/30 transition-all duration-300"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="px-8 border-[#564787]/30 hover:bg-[#564787]/10 hover:border-[#564787]/50 hover:text-[#564787] transition-colors duration-300"
                  >
                    See Demo
                  </Button>
                </div>
                <div className="flex items-center pt-4 gap-2 text-sm text-[#101935]/70">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-[#f2fdff] bg-[#101935]/10 overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=32&width=32&random=${i}`}
                          alt="User"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span>Trusted by 10,000+ freelancers</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] animate-float">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#564787]/20 to-[#564787]/20 shadow-2xl"></div>
                    <Image
                      src={LandingImage}
                      alt="Proposal App Preview"
                      fill
                      className=""
                      priority
                    />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="w-full py-8 bg-[#d7cbd8]/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {['Google', 'Microsoft', 'Airbnb', 'Spotify', 'Slack'].map((company) => (
                <div key={company} className="flex items-center gap-2 text-lg font-medium text-[#101935]/80">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-small-[#564787]/[0.03]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-[#101935] to-[#564787] bg-clip-text text-transparent">
                  About ProposalPro
                </h2>
                <p className="mx-auto max-w-[700px] text-[#101935]/80 md:text-xl">
                  ProposalPro was built by freelancers, for freelancers. We understand the challenges of creating
                  professional proposals that win clients.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="space-y-4">
                  {[
                    "Beautiful, customizable templates for every industry",
                    "AI-powered content generation for persuasive proposals",
                    "Client management and tracking tools",
                    "Real-time analytics on proposal performance"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#564787]/10 text-[#564787]">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-[#101935]/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button className="bg-gradient-to-r from-[#564787] to-[#564787] hover:from-[#564787]/90 hover:to-[#564787]/90 shadow-lg hover:shadow-[#564787]/30 transition-all duration-300">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Star, title: "4.9/5 Rating", description: "From over 1,000 freelancers" },
                  { icon: BarChart, title: "40% Higher", description: "Proposal acceptance rate" },
                  { icon: Shield, title: "100% Secure", description: "End-to-end encryption" },
                  { icon: Users, title: "10,000+", description: "Active freelancers" }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center space-y-2 rounded-xl border bg-[#f2fdff]/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#564787]/30"
                  >
                    <div className="rounded-full bg-[#564787]/10 p-3 text-[#564787]">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#101935]">{item.title}</h3>
                    <p className="text-center text-sm text-[#101935]/80">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#d7cbd8]/20 to-[#f2fdff] relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-[#564787]/[0.05]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[#564787]/10 text-[#564787] ring-1 ring-[#564787]/20">
                  Powerful Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-[#101935] to-[#564787] bg-clip-text text-transparent">
                  Features Designed for Freelancers
                </h2>
                <p className="mx-auto max-w-[700px] text-[#101935]/80 md:text-xl">
                  Everything you need to create professional proposals that win clients.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                { 
                  icon: FileText, 
                  title: "Professional Templates", 
                  description: "Choose from dozens of industry-specific templates designed to impress clients.",
                  color: "text-[#564787]"
                },
                { 
                  icon: Zap, 
                  title: "AI-Powered Content", 
                  description: "Generate persuasive content tailored to your client's needs with our AI assistant.",
                  color: "text-[#9ad4d6]"
                },
                { 
                  icon: Users, 
                  title: "Client Management", 
                  description: "Track client interactions, manage revisions, and close deals faster.",
                  color: "text-[#564787]"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center space-y-4 rounded-xl border bg-[#f2fdff]/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#564787]/30 group"
                >
                  <div className={`rounded-full ${feature.color}/10 p-3 ${feature.color} group-hover:bg-gradient-to-br from-[#564787]/10 to-${feature.color}/10`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#101935]">{feature.title}</h3>
                  <p className="text-center text-[#101935]/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#f2fdff] to-[#d7cbd8]/20">
          <div className="absolute inset-0 bg-grid-small-[#564787]/[0.02]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[#564787]/10 text-[#564787] ring-1 ring-[#564787]/20">
                  Simple Process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-[#101935] to-[#564787] bg-clip-text text-transparent">
                  How ProposalPro Works
                </h2>
                <p className="mx-auto max-w-[700px] text-[#101935]/80 md:text-xl">
                  Create winning proposals in just three simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  step: 1,
                  title: "Choose a Template",
                  description: "Select from our library of professional templates designed for your industry.",
                  imageAlt: "Template Selection",
                  overlayText: "Beautiful Templates"
                },
                {
                  step: 2,
                  title: "Customize Content",
                  description: "Add your services, pricing, and use our AI to generate persuasive content.",
                  imageAlt: "Content Customization",
                  overlayText: "AI-Powered Content"
                },
                {
                  step: 3,
                  title: "Send & Track",
                  description: "Share your proposal with clients and track when they view and accept it.",
                  imageAlt: "Send and Track",
                  overlayText: "Real-time Analytics"
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-4 group">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-[#f2fdff] shadow-lg bg-gradient-to-br from-[#564787] to-[#564787] group-hover:scale-110 transition-transform duration-300"
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#101935]">{item.title}</h3>
                  <p className="text-center text-[#101935]/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#d7cbd8]/20 to-[#f2fdff] relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-[#564787]/[0.03]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[#564787]/10 text-[#564787] ring-1 ring-[#564787]/20">
                  Success Stories
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-[#101935] to-[#564787] bg-clip-text text-transparent">
                  Trusted by Freelancers
                </h2>
                <p className="mx-auto max-w-[700px] text-[#101935]/80 md:text-xl">
                  See what other freelancers are saying about ProposalPro.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              {[
                {
                  rating: 5,
                  quote: "ProposalPro has completely transformed how I approach new clients. My proposal acceptance rate has increased by 40% since I started using it.",
                  name: "Sarah Johnson",
                  role: "Web Designer",
                  image: "/placeholder.svg?height=40&width=40&random=1"
                },
                {
                  rating: 5,
                  quote: "The AI-powered content suggestions save me hours of writing time. I can now create a professional proposal in under 15 minutes.",
                  name: "Michael Chen",
                  role: "Marketing Consultant",
                  image: "/placeholder.svg?height=40&width=40&random=2"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="flex flex-col justify-between rounded-xl border bg-[#f2fdff]/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#564787]/30"
                >
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#564787] text-[#564787]" />
                      ))}
                    </div>
                    <blockquote className="text-[#101935]/80 italic">
                      {testimonial.quote}
                    </blockquote>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#101935]/10">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-[#101935]">{testimonial.name}</p>
                      <p className="text-sm text-[#101935]/80">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-[#564787]/5 via-[#f2fdff] to-[#564787]/5">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#564787]/20 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#564787]/20 rounded-full filter blur-3xl animate-float-delay"></div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-[#101935] to-[#564787] bg-clip-text text-transparent">
                  Ready to Win More Clients?
                </h2>
                <p className="mx-auto max-w-[700px] text-[#101935]/80 md:text-xl">
                  Join thousands of freelancers who are growing their business with ProposalPro.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button
                  size="lg"
                  className="px-8 shadow-lg bg-gradient-to-r from-[#564787] to-[#564787] hover:from-[#564787]/90 hover:to-[#564787]/90 hover:shadow-[#564787]/30 transition-all duration-300"
                >
                  Get Started Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 border-[#564787]/30 hover:bg-[#564787]/10 hover:border-[#564787]/50 hover:text-[#564787] transition-colors duration-300"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-[#f2fdff]/80 backdrop-blur-lg">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#564787]" />
            <span className="text-lg font-bold bg-gradient-to-r from-[#564787] to-[#564787] bg-clip-text text-transparent">
              ProposalPro
            </span>
          </div>
          <p className="text-center text-sm text-[#101935]/80 md:text-left">
            &copy; {new Date().getFullYear()} ProposalPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}