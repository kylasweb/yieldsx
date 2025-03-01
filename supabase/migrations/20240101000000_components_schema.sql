-- Create components table
CREATE TABLE IF NOT EXISTS public.components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous access
CREATE POLICY "Allow anonymous access to components" 
  ON public.components FOR SELECT 
  USING (true);

-- Create policy for authenticated users to modify
CREATE POLICY "Allow authenticated users to modify components" 
  ON public.components FOR ALL 
  USING (auth.role() = 'authenticated');

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.components;

-- Insert dashboard components
INSERT INTO public.components (name, type, description, file_path) VALUES
('AccountSummary', 'dashboard', 'Displays account balance and metrics', 'src/components/dashboard/AccountSummary.tsx'),
('ActiveInvestments', 'dashboard', 'Shows active investment packages', 'src/components/dashboard/ActiveInvestments.tsx'),
('AIAssistant', 'dashboard', 'AI-powered trading assistant', 'src/components/dashboard/AIAssistant.tsx'),
('Header', 'dashboard', 'Dashboard header with user info', 'src/components/dashboard/Header.tsx'),
('InvestmentManagement', 'dashboard', 'Manage deposits, withdrawals and investments', 'src/components/dashboard/InvestmentManagement.tsx'),
('PerformanceChart', 'dashboard', 'Interactive investment performance chart', 'src/components/dashboard/PerformanceChart.tsx'),
('Sidebar', 'dashboard', 'Navigation sidebar', 'src/components/dashboard/Sidebar.tsx');

-- Insert auth components
INSERT INTO public.components (name, type, description, file_path) VALUES
('AuthContext', 'auth', 'Authentication context provider', 'src/components/auth/AuthContext.tsx'),
('LoginPage', 'auth', 'User login page', 'src/components/auth/LoginPage.tsx'),
('RegisterPage', 'auth', 'User registration page', 'src/components/auth/RegisterPage.tsx'),
('ProtectedRoute', 'auth', 'Route protection wrapper', 'src/components/auth/ProtectedRoute.tsx');

-- Insert wallet components
INSERT INTO public.components (name, type, description, file_path) VALUES
('WalletIntegration', 'wallet', 'External wallet integration', 'src/components/wallet/WalletIntegration.tsx');

-- Insert referral components
INSERT INTO public.components (name, type, description, file_path) VALUES
('ReferralNetwork', 'referral', 'Referral network visualization', 'src/components/referral/ReferralNetwork.tsx');

-- Insert landing components
INSERT INTO public.components (name, type, description, file_path) VALUES
('LandingPage', 'landing', 'Main landing page', 'src/components/landing/LandingPage.tsx'),
('Home', 'main', 'Main dashboard home page', 'src/components/home.tsx');
