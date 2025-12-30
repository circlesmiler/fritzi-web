# Fritzi Web

A simple web project to track and visualize the location of Fritzi using Leaflet maps and a secure AWS Lambda backend.

## Features

- Interactive map with Leaflet.js
- Home and cat markers
- Real-time data from AWS Lambda (via PHP proxy)
- Responsive UI with jQuery

## File Structure

```plain
website/
  index.html         # Main webpage
  index.js           # JavaScript logic (uses Leaflet, jQuery)
  style.css          # Custom styles
  home.png, cat.png  # Marker icons
  jquery-3.7.1.min.js# jQuery library
  proxy.php          # PHP proxy to hide AWS endpoint
  leaflet/           # Leaflet library and images
    images/          # Leaflet marker images
```

## Security

- The AWS Lambda endpoint is not stored in the repository.
- During deployment, the endpoint is injected into `proxy.php` using a GitHub Actions secret.

## Deployment

- Uses GitHub Actions to deploy the site to an FTP server.
- See `.github/workflows/deploy.yml` for details.

## How it works

1. The frontend calls `proxy.php` for data.
2. `proxy.php` forwards requests to the AWS Lambda endpoint (injected at deploy).
3. The map updates with Fritzi's location and status.

## Setup

1. Add your FTP and AWS endpoint secrets to your GitHub repository.
2. Push to `main` to trigger deployment.

## License

MIT
