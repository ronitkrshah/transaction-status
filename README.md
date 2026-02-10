# Live URL

https://ronitkrshah.github.io/transaction-status/

# How it works

The app sends a transaction request and keeps track of what’s happening so the user always knows the current status.

### States

The app can be in one of these states:

- **Idle** – waiting for the user
- **Pending** – request sent
- **Retrying** – trying again after a temporary failure
- **Success** – transaction completed
- **Error** – failed after too many retries

---

## Retry logic

If the server temporarily fails (for example, returns a 503 error):

- The request is retried automatically
- Up to **3 attempts** maximum
- Waits **1 second** between retries
- If any retry succeeds, the process ends in success

This avoids infinite retries and gives the server time to recover.

---

## Preventing duplicate transactions

To avoid submitting the same transaction more than once:

- Each transaction gets a **unique ID**
- Successful IDs are stored in memory
- Before saving a result, the app checks if the ID already exists
- If it does, the duplicate response is ignored
