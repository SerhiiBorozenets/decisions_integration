# Welcome to the Cloverpop Decisions Integration App

## Introduction

The Cloverpop Decisions Integration App allows you to make requests to the Cloverpop server and create decisions.

The Cloverpop Decisions Integration App is built on:
- Ruby 3.1.2
- Rails 7.1.3
- postgresql 10.0 or higher

---

## Table of Contents
- [General Info](#welcome-to-the-vibe-report-app)
- [Setup](#setup)
- [Methods](#methods)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Security](#security)
- [New Development Machine Install (Mac)](#new-development-machine-install-mac)
- [GIT and Changing Code](#git)
- [Code Submissions and Reviews](#code-submissions-and-reviews)
- [Start Rails server](#start-rails-server)
- [OpenSSL::Cipher::CipherError](#opensslcipherciphererror)
- [How to Add Your Own Logo and Favicon to the Vibe Report App](#how-to-add-your-own-logo-and-favicon-to-the-vibe-report-app)
- [License](#license)

---

## Setup
Before using the `PagesController`, make sure you have the following environment variables set:
- `CLOVERPOP_DOMAIN`: The base URL of the Cloverpop API.
- `CLOVERPOP_ORG_API_TOKEN`: Your organization's API token for authentication.

## Methods

### `init_data`
- **Description**: Initiates data retrieval from the Cloverpop API.
- **HTTP Method**: GET
- **Endpoint**: `CLOVERPOP_DOMAIN/api/v1/decisions`

### `create_decision`
- **Description**: Creates a new decision via the Cloverpop API.
- **HTTP Method**: POST
- **Endpoint**: `CLOVERPOP_DOMAIN/api/v1/decisions`
- **Parameters**:
    - `decision`: The decision to be created, passed as a parameter.

### `make_api_request(url, method, body = nil)`
- **Description**: Makes a generic API request to the specified URL using the provided HTTP method.
- **Parameters**:
    - `url`: The URL of the API endpoint.
    - `method`: The HTTP method (`:get`, `:post`, etc.).
    - `body`: Optional. The request body in JSON format.

## Usage
To utilize the methods provided by the `PagesController`, follow these steps:
1. Ensure the required environment variables are correctly set in your application environment.
2. Use the methods `init_data` and `create_decision` as needed within your application logic.

## Error Handling
If an error occurs during an API request, the controller will log the error and return an appropriate JSON response with an error message.

## Security
Ensure that sensitive information such as API tokens (`CLOVERPOP_ORG_API_TOKEN`) is handled securely and not exposed publicly.

---

## New Development Machine Install (Mac)

*NOTE:* After installing something new, if something doesn't work like you expect, try quitting and restarting terminal.

[...instructions continue...]

## GIT

[...instructions continue...]

## How to Add Your Own Logo and Favicon to the Vibe Report App

[...instructions continue...]

## License

The MIT License (MIT)

[...license content...]

