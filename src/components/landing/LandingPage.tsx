import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Zap, Users, Bot } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header/Navigation */}
      <header className="backdrop-blur-md bg-black/30 border-b border-gray-800 fixed w-full z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">YS</span>
            </div>
            <h1 className="text-xl font-bold">Yield Sx</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="hover:text-blue-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="hover:text-blue-400 transition-colors"
            >
              Benefits
            </a>
            <a
              href="#testimonials"
              className="hover:text-blue-400 transition-colors"
            >
              Testimonials
            </a>
          </nav>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-white hover:text-blue-400 hover:bg-gray-800"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Smart Trading
              </span>{" "}
              for the Modern Investor
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Yield Sx provides advanced trading tools, AI-powered insights, and
              seamless wallet integration to maximize your investment potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  Get Started
                </Button>
              </Link>
              <a href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 backdrop-blur-lg bg-black/20 p-8 rounded-2xl border border-gray-800">
            <Card className="bg-gray-900/70 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-center">
                  Create Your Account
                </h3>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Full Name</label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6">
                    Register Now
                  </Button>
                  <p className="text-center text-sm text-gray-400 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 hover:underline">
                      Login
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-6 bg-gray-900/50 backdrop-blur-md"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Powerful Features
            </span>{" "}
            for Smart Trading
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-blue-500" />}
              title="Performance Analytics"
              description="Track your investment growth with interactive charts and detailed metrics."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-green-500" />}
              title="Secure Wallet Integration"
              description="Connect popular wallets like MetaMask and Binance for seamless transactions."
            />
            <FeatureCard
              icon={<Bot className="h-10 w-10 text-purple-500" />}
              title="AI Trading Assistant"
              description="Get personalized investment recommendations powered by advanced analytics."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-yellow-500" />}
              title="Referral Network"
              description="Invite friends and earn commission on their trades to boost your earnings."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Why Choose
            </span>{" "}
            Yield Sx
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              number="01"
              title="Smart Investment Packages"
              description="Choose from a variety of investment packages with different risk levels and ROI potential."
            />
            <BenefitCard
              number="02"
              title="Real-time Performance Tracking"
              description="Monitor your investments in real-time with detailed analytics and performance metrics."
            />
            <BenefitCard
              number="03"
              title="AI-Powered Insights"
              description="Get intelligent recommendations based on market trends and your investment history."
            />
            <BenefitCard
              number="04"
              title="Secure Transactions"
              description="All transactions are secured with industry-standard encryption and security protocols."
            />
            <BenefitCard
              number="05"
              title="Seamless Wallet Integration"
              description="Connect your existing wallets for easy deposits and withdrawals without hassle."
            />
            <BenefitCard
              number="06"
              title="Lucrative Referral System"
              description="Earn passive income by referring friends to join our trading platform."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-6 bg-gray-900/50 backdrop-blur-md"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              What Our Users
            </span>{" "}
            Say About Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Yield Sx has transformed how I manage my investments. The AI assistant provides valuable insights that have significantly improved my returns."
              author="Sarah Johnson"
              role="Professional Trader"
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
            />
            <TestimonialCard
              quote="The wallet integration is seamless, and the performance tracking tools give me a clear picture of my investment growth. Highly recommended!"
              author="Michael Chen"
              role="Tech Investor"
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
            />
            <TestimonialCard
              quote="As a beginner investor, the platform's user-friendly interface and AI assistant have been invaluable in helping me make informed decisions."
              author="Jessica Williams"
              role="New Investor"
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto backdrop-blur-lg bg-blue-900/20 p-12 rounded-2xl border border-blue-800">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of investors who are already maximizing their
              returns with Yield Sx.
            </p>
            <Link to="/register">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              >
                Create Your Account Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">YS</span>
              </div>
              <h1 className="text-xl font-bold">Yield Sx</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
              <a
                href="#features"
                className="hover:text-blue-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="hover:text-blue-400 transition-colors"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                className="hover:text-blue-400 transition-colors"
              >
                Testimonials
              </a>
              <Link
                to="/login"
                className="hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-blue-400 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Yield Sx. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="backdrop-blur-md bg-black/20 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all hover:transform hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const BenefitCard = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="backdrop-blur-md bg-black/20 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
      <div className="text-4xl font-bold text-blue-600 mb-4">{number}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
}: {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}) => {
  return (
    <div className="backdrop-blur-md bg-black/20 p-6 rounded-xl border border-gray-800">
      <div className="mb-4 text-gray-300">
        <svg
          className="h-8 w-8 text-blue-500 mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="italic">{quote}</p>
      </div>
      <div className="flex items-center">
        <img
          src={avatar}
          alt={author}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-bold">{author}</p>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
