# Security Policy

## Reporting a vulnerability

Please do **not** open a public issue for a security problem.

Use GitHub's private reporting instead: open the **Security** tab of this repository and choose **Report a vulnerability**.
Include what you found, how to reproduce it and the card version.

This is a small hobby project maintained by one person, distributed **as is** and without any warranty. Reports are read on a best-effort basis, with no guaranteed response time.

## Scope

The card only runs in the browser inside Home Assistant, reads entity states and calls the Home Assistant services that you configure (for example the BMS switches). It does not contact any other server.
