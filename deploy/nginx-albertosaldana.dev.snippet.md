# Nginx snippet for albertosaldana.dev

In the existing HTTPS `server` block for `albertosaldana.dev`, set:

```nginx
proxy_pass http://127.0.0.1:8081;
```

(instead of `3001` or any other port). Keep the current SSL certificate and redirects.
