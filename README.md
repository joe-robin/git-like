# My Project

## Prerequisites

Ensure you have Node.js installed on your system. If you do not have Node.js installed, follow the instructions below:

### Installing Node.js

1. **Windows**:

   - Download the Node.js installer from the [official Node.js website](https://nodejs.org/).
   - Run the installer, follow the prompts, and ensure to include npm (Node Package Manager).

2. **macOS**:

   - Use Homebrew to install Node.js:
     ```sh
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     brew install node
     ```

3. **Linux**:

   - Use the package manager for your distribution. For example, on Debian-based systems (like Ubuntu):

     ```sh
     sudo apt update
     sudo apt install nodejs npm
     ```

   - Alternatively, you can use nvm (Node Version Manager) to install Node.js:
     ```sh
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
     source ~/.bashrc
     nvm install node
     ```

Verify the installation by running:

```sh
node -v
npm -v
```

## Cloning the Repository

1. Open your terminal.
2. Clone the repository using the command:
   ```sh
   git clone https://github.com/joe-robin/git-like
   ```
3. Navigate into the project directory:
   ```sh
   cd git-like
   ```

## Installing Dependencies

Install the necessary packages by running:

```sh
npm install

```

## Running the Development Server

Start the development server with:

```sh
npm run dev

```

## Usage Instructions

**Viewing Commit Changes in Browser**

This guide explains how to view the changes introduced in a specific Git commit using a browser.

**1. Find the Commit on GitHub**

Navigate to the desired commit on GitHub.

**2. Copy User ID and Commit Hash**

The URL for the commit will contain the user ID and commit hash, typically formatted like this:

```sh
https://github.com/username/repo/commit/abcdef1234567890

```

In this example, "username" is the user ID and "abcdef1234567890" is the commit hash. Copy both the username and commit hash together (username/repo/abcdef1234567890).

**3. Construct the View URL**

Append the copied user ID and commit hash to the following base URL:

```sh
http://localhost:3000/repositories/

```

For instance, if your copied data is "joe-robin/chat-app/commit/8cdc31fae18eafab3a53173778f7fffb9ef6aeb6", the complete URL would be:

```sh
http://localhost:3000/repositories/joe-robin/chat-app/commit/8cdc31fae18eafab3a53173778f7fffb9ef6aeb6

```

**4. View the Commit Details**

Paste the constructed URL into your browser. This will display the details of the specific commit, including the changes introduced.
