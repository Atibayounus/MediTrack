# Reflection — MediTrack Assignment

### 1. Your site has an XSS bug. What can an attacker do, and not do, when the token is in an HttpOnly cookie?

Since the cookie is httpOnly, JavaScript running on the page (even malicious injected JS from an XSS attack) can't read it. So even if an attacker manages to run a script on my site, they can't just do `document.cookie` and grab the token to use somewhere else. But they can still do stuff while the user is on the page, because the browser is still attaching the cookie automatically to any request the malicious script sends from that page. So it stops the token from being stolen and reused later, but it doesn't fully protect against everything if there's already an XSS bug the session itself can still be abused while it's active.

### 2. Why is 404 better than 403 when patient A asks for patient B's appointment?

If we sent back 403 it would basically tell the attacker "yeah this id is real, you're just not allowed to see it." That's already leaking info  now they know that appointment exists. With 404 they have no way to tell if it doesn't exist at all or if it just belongs to someone else. For something like medical appointments that's important, we don't want random people confirming other patients even have appointments.

### 3. Why does /me exist when the browser already has a valid cookie?

Because Redux state and the cookie are two totally different things. The cookie stays in the browser after a refresh but Redux resets back to empty every time the page reloads. So even though the browser is technically still logged in (cookie-wise), the app itself doesn't know that until it asks the server. That's what /me is for  it lets the frontend rebuild its state (who's logged in, their role, etc) using the cookie that's already there, instead of making the user log in again every refresh.

### 4. Your staff panel hides the Confirm button from patients. Why is that not security?

Because hiding a button in React only changes what shows up on the screen, it doesn't touch the actual backend route. A patient could just open Postman or the browser dev tools and send a PATCH request straight to /api/staff/appointments/:id/status themselves, without ever clicking any button. If the server route itself wasn't also checking the role with requireRole("staff"), that request would just go through. So hiding the button is more of a UX thing for normal users, the real protection has to be on the server checking the role every time, not the frontend deciding what to show.

### 5. A patient wants to be signed out of every device now. Why is that hard with a JWT?

Because a JWT doesn't get stored anywhere on the server after it's issued  the server just trusts the signature. So there's no database row to go delete or session to kill like there would be with something like sessions. If I clear the cookie, that stops that one browser from sending the token again, but if the same token exists somewhere else (another device, or someone copied it), it's still valid until it naturally expires on its own. To actually force a logout everywhere you'd need extra stuff we didn't build here, like keeping a token version per user or a blocklist and checking that on every request.

### 6. You set expiresIn to seven days. Argue for shorter and for longer. Which would you pick for a clinic?

Shorter is better from a security angle if a token somehow leaks (stolen cookie, shared computer, whatever) a short expiry limits how long that's actually usable. Since this is medical/appointment data, less exposure time is safer.

Longer is better for convenience patients aren't opening this app every day, so if the token expired every hour they'd have to log in constantly just to check one appointment, which is annoying for something used this rarely.

If I had to pick for an actual clinic I'd probably go somewhere in the middle, like a day or two instead of a full week. It's still long enough that people aren't annoyed logging in every time, but it doesn't leave a token valid for a whole week if something goes wrong. The /me check on load makes the session feel seamless anyway so shortening it wouldn't even really be noticeable to the patient.
