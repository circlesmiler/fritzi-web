<?php
// proxy.php
// Do NOT commit your AWS endpoint to your public repo!

$aws_endpoint = '__AWS_ENDPOINT__';

// Forward GET requests only
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Build the target URL (add query string if present)
    $url = $aws_endpoint;
    if (!empty($_SERVER['QUERY_STRING'])) {
        $url .= '?' . $_SERVER['QUERY_STRING'];
    }

    // Initialize cURL
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, false);

    // Optionally set headers if needed
    // curl_setopt($ch, CURLOPT_HTTPHEADER, [ ... ]);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // Forward response code and content type
    http_response_code($http_code);
    header('Content-Type: application/json');
    echo $response;
    exit;
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}
