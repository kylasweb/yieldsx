```mermaid
%% Main Application Flow
A[User] --> B{Authentication}
B -->|Not Authenticated| C[Public Pages]
B -->|Authenticated User| D[User Dashboard]
B -->|Authenticated Admin| J[Admin Dashboard]

%% Public Pages Flow
C --> C1[Landing Page]
C1 --> C2[Login Page]
C1 --> C3[Register Page]
C2 --> B
C3 --> B

%% User Dashboard Flow
D --> D1[Main Dashboard]
D1 --> D2[Account Summary]
D1 --> D3[Performance Charts]
D1 --> D4[Active Investments]
D1 --> D5[Investment Management]
D1 --> D6[AI Assistant]
D1 --> D7[Wallet Integration]
D1 --> D8[Referral Network]

%% Account Summary Flow
D2 --> D2A[View Balance]
D2 --> D2B[View Earnings]
D2 --> D2C[View Available Funds]

%% Performance Charts Flow
D3 --> D3A[View Daily Performance]
D3 --> D3B[View Weekly Performance]
D3 --> D3C[View Monthly Performance]
D3 --> D3D[View Yearly Performance]
D3 --> D3E[Export Reports]

%% Active Investments Flow
D4 --> D4A[View Investment Details]
D4 --> D4B[Track ROI]
D4 --> D4C[Monitor Progress]

%% Investment Management Flow
D5 --> D5A{Action?}
D5A -->|Deposit| D5B[Deposit Funds]
D5A -->|Withdraw| D5C[Withdraw Funds]
D5A -->|Invest| D5D[Make Investment]
D5B --> D5B1[Select Payment Method]
D5B1 --> D5B2[Confirm Deposit]
D5C --> D5C1[Select Withdrawal Method]
D5C1 --> D5C2[Confirm Withdrawal]
D5D --> D5D1[Select Investment Package]
D5D1 --> D5D2[Enter Investment Amount]
D5D2 --> D5D3[View ROI Calculation]
D5D3 --> D5D4[Confirm Investment]

%% AI Assistant Flow
D6 --> D6A[Ask Question]
D6A --> D6B[Receive Recommendations]
D6A --> D6C[Get Market Insights]

%% Wallet Integration Flow
D7 --> D7A{Action?}
D7A -->|Connect| D7B[Select Wallet]
D7A -->|View| D7C[View Transactions]
D7B --> D7B1[Connect Wallet]
D7B1 --> D7B2[Approve Connection]
D7C --> D7C1[View Transaction History]

%% Referral Network Flow
D8 --> D8A[View Referral Stats]
D8 --> D8B[Copy Referral Link]
D8 --> D8C[Share Referral Link]
D8 --> D8D[View Referrals]

%% Admin Dashboard Flow
J --> J1[Admin Overview]
J --> J2[User Management]
J --> J3[Finance Management]
J --> J4[Investment Plans]
J --> J5[Commission Management]
J --> J6[Rewards Management]

%% Admin Overview Flow
J1 --> J1A[View Key Metrics]
J1A --> J1B[User Growth]
J1A --> J1C[Revenue Metrics]
J1A --> J1D[Transaction Activity]
J1A --> J1E[Export Reports]

%% User Management Flow
J2 --> J2A[View User Accounts]
J2A --> J2B[Filter Users]
J2A --> J2C[Search Users]
J2A --> J2D{User Action?}
J2D -->|View| J2E[View User Details]
J2D -->|Edit| J2F[Edit User Profile]
J2D -->|Add| J2G[Add New User]
J2D -->|Suspend| J2H[Suspend User Account]
J2D -->|Activate| J2I[Activate User Account]
J2D -->|Delete| J2J[Delete User Account]
J2E --> J2K[View User Transactions]
J2E --> J2L[View User Investments]
J2E --> J2M[View User Referrals]
J2E --> J2N[View User Communications]

%% Finance Management Flow
J3 --> J3A[View Financial Summary]
J3A --> J3B[Total Deposits]
J3A --> J3C[Total Withdrawals]
J3A --> J3D[Total Commissions]
J3A --> J3E[Total Investments]
J3 --> J3F[Manage Transactions]
J3F --> J3G{Transaction Action?}
J3G -->|View| J3H[View Transaction Details]
J3G -->|Approve| J3I[Approve Pending Transaction]
J3G -->|Reject| J3J[Reject Transaction]
J3G -->|Export| J3K[Export Transaction Receipt]
J3 --> J3L[Generate Reports]

%% Investment Plans Flow
J4 --> J4A[View All Plans]
J4A --> J4B[Filter Plans]
J4A --> J4C{Plan Action?}
J4C -->|View| J4D[View Plan Details]
J4C -->|Create| J4E[Create New Plan]
J4C -->|Edit| J4F[Edit Existing Plan]
J4C -->|Activate| J4G[Activate Plan]
J4C -->|Deactivate| J4H[Deactivate Plan]
J4C -->|Delete| J4I[Delete Plan]
J4E --> J4J[Set Plan Parameters]
J4J --> J4K[Set Min-Max Investment]
J4J --> J4L[Set ROI Percentage]
J4J --> J4M[Set Duration]
J4J --> J4N[Configure Additional Options]
J4J --> J4O[Save New Plan]

%% Commission Management Flow
J5 --> J5A[View Commission Rules]
J5A --> J5B[Filter Rules]
J5A --> J5C{Rule Action?}
J5C -->|View| J5D[View Rule Details]
J5C -->|Add| J5E[Add New Rule]
J5C -->|Edit| J5F[Edit Existing Rule]
J5C -->|Activate| J5G[Activate Rule]
J5C -->|Deactivate| J5H[Deactivate Rule]
J5 --> J5I[Manage Commission Payouts]
J5I --> J5J[View Pending Commissions]
J5I --> J5K[View Paid Commissions]
J5I --> J5L[Process Commission Payouts]

%% Rewards Management Flow
J6 --> J6A[View Rewards]
J6A --> J6B[Filter Rewards]
J6A --> J6C{Reward Action?}
J6C -->|View| J6D[View Reward Details]
J6C -->|Create| J6E[Create New Reward]
J6C -->|Edit| J6F[Edit Existing Reward]
J6C -->|Activate| J6G[Activate Reward]
J6C -->|Deactivate| J6H[Deactivate Reward]
J6 --> J6I[Manage Reward Claims]
J6I --> J6J[View Pending Claims]
J6I --> J6K[Approve Claims]
J6I --> J6L[Reject Claims]
J6I --> J6M[Mark Claims as Fulfilled]

%% Cross-System Connections
D5B2 -->|Transaction Created| J3F
D5C2 -->|Transaction Created| J3F
D5D4 -->|Investment Created| J4A
D8D -->|Referrals Visible to Admin| J2M
J2G -->|New User Created| B
J4E -->|New Plan Available| D5D1
J5E -->|New Commission Rule| D8A
J6E -->|New Reward Available| D8A
```