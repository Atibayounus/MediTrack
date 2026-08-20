# Reflection Answers MediTrack Assignment

### 1. Your site has an XSS bug. What can an attacker do, and not do, when the token is in an HttpOnly cookie?

An XSS bug lets an attacker run their own JavaScript inside the page, but because the token cookie is marked `httpOnly`, that injected script has no way to read `document.cookie` — the browser simply hides the cookie from JavaScript. So the attacker cannot steal the token and reuse it somewhere else. What they *can* still do is act inside the current page as the logged in user — for example trigger an appointment request or a cancel action while the victim is on the page, since the cookie is still attached automatically to any request the injected script makes. HttpOnly protects the token from theft, but it does not stop misuse of the live session.

### 2. Why is 404 better than 403 when patient A asks for patient B's appointment?

A 403 tells the requester "this exists, but you are not allowed to see it," which confirms that the id is a real, valid appointment in the system. A 404 gives away nothing — the requester cannot tell whether the id belongs to someone else or simply does not exist at all. For medical data especially, even confirming that a record exists is a privacy leak, so returning 404 for both "not found" and "not yours" keeps patient A from learning anything about patient B's appointments.

### 3. Why does /me exist when the browser already has a valid cookie?

The cookie survives a page refresh, but the Redux store does not — a refresh wipes all in-memory state back to `initialState`, including `user` and `isAuthenticated`. The browser is still silently attaching the cookie to every request, but the React app itself has no idea who is logged in until it asks. `/me` is that question: it lets the app rebuild its session state from the cookie the server already trusts, right after the page reloads, instead of forcing the user to log in again every time.

### 4. Your staff panel hides the Confirm button from patients. Why is that not security?

Hiding a button only changes what the browser renders — it does nothing to the API endpoint underneath. Anyone can open DevTools, use Postman, or run a `curl` command to call `PATCH /api/staff/appointments/:id/status` directly, completely bypassing the React UI. If the server did not also check `requireRole("staff")` on that route, a patient could confirm or cancel any appointment in the clinic just by hitting the endpoint directly. The UI hiding the button is only a convenience for honest users; the actual security has to live on the server, in the middleware that checks the role on every request.

### 5. A patient wants to be signed out of every device now. Why is that hard with a JWT?

A JWT is stateless — once the server signs it, the server does not keep a record of it anywhere. Verifying a token later is just checking the signature and the expiry, not looking it up in a database. That means there is no single place to "delete" a token the way you would delete a session row. Clearing the cookie only stops the browser that made the request from sending the token again; a copy of that same token saved somewhere else (another device, an intercepted request) is still cryptographically valid until it naturally expires. To truly force logout everywhere you would need extra machinery the assignment does not use — such as storing a per-user "token version" or a server-side blocklist of revoked tokens, and checking it on every request.

### 6. You set expiresIn to seven days. Argue for shorter and for longer. Which would you pick for a clinic?

**Case for shorter (e.g. 15 minutes–1 hour):** If a token is ever stolen — through a leaked cookie, a shared computer, or a bug — a short expiry limits how long the attacker can use it. It also matches how sensitive medical appointment data is; less standing exposure is safer.

**Case for longer (e.g. 7 days):** Patients are not on the portal all day. Forcing a login every hour would mean typing a password almost every time they open the app, which is frustrating for something as low-frequency as checking or booking a clinic appointment. A longer session keeps the app usable without patients constantly re-authenticating.

**My choice:** For a clinic appointment portal I would lean toward a shorter expiry than seven days — something like 1–2 days — combined with the `/me` check on load so the session still feels seamless. The data is sensitive enough (linking a real name to medical visit reasons) that I would rather trade a little convenience for a smaller window of risk if a device or cookie were ever compromised, while still not making patients log in constantly for a portal they might only check once a week.
