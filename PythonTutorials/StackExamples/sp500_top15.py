import pandas as pd
import yfinance as yf

# Define the list of S&P 500 companies
sp500_url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
table = pd.read_html(sp500_url)
df = table[0]

# Extract the ticker symbols
tickers = df['Symbol'].tolist()

# Remove potential spaces from date strings
start_date = '2024-01-01'
end_date = '2024-12-31'

# Download financial data
data = yf.download(tickers, start=start_date, end=end_date, progress=False)

# Calculate percentage change
percentage_changes = {}
for ticker in tickers:
    try:
        start_price = data['Adj Close'][ticker].iloc[0]
        end_price = data['Adj Close'][ticker].iloc[-1]
        percentage_change = ((end_price - start_price) / start_price) * 100
        percentage_changes[ticker] = percentage_change
    except Exception as e:
        print(f"Error processing {ticker}: {e}")

# Convert to DataFrame and sort
percentage_df = pd.DataFrame.from_dict(percentage_changes, orient='index', columns=['Percentage Change'])
percentage_df = percentage_df.dropna().sort_values(by='Percentage Change', ascending=False)

# Get the top 15 companies
top_15 = percentage_df.head(15)

# Display the results
print(top_15)