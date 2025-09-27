# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Agentic Workflow project focused on R&D framework development with a multi-agent orchestrator system. The project currently consists of a single HTML file (`agents.html`) that implements a web-based interface for managing and interacting with multiple AI agents.

## Current Architecture

### Main Application
- **`agents.html`** - A 1900+ line HTML file containing the complete web application
- Implements a multi-agent orchestration system with real-time communication
- Features include agent management, conversation history, and task execution
- Uses modern CSS with dark theme and gradient backgrounds
- JavaScript-based agent communication and task management

### Key Features
- Multi-agent coordination and communication
- Real-time conversation tracking
- Task execution and monitoring
- Agent status management (active, idle, processing)
- Web-based interface with responsive design

## Development Environment

### Current State
- No package.json, requirements.txt, or other configuration files present
- No build system or dependency management currently set up
- Pure HTML/CSS/JavaScript application
- Git repository initialized with basic .gitignore for aider files

### Working with the Codebase
- The entire application is contained in a single HTML file
- Open `agents.html` directly in a web browser to run the application
- No build steps or compilation required
- Edit the HTML file directly to make changes

## File Structure
```
/Volumes/Storage/Development/AgenticWorkflow/
├── .git/
├── .gitignore              # Basic gitignore for aider files
├── .aider.chat.history.md  # Aider chat history
├── .aider.input.history    # Aider input history
├── .aider.tags.cache.v4/   # Aider tags cache directory
└── agents.html            # Main application (1900+ lines)
```

## Key Components in agents.html

### Agent Management System
- Agent creation and configuration
- Agent status tracking and updates
- Multi-agent communication protocols
- Task assignment and execution

### User Interface
- Modern dark theme with gradient backgrounds
- Responsive design for various screen sizes
- Real-time updates and status indicators
- Conversation history display

### Communication Framework
- WebSocket-style communication simulation
- Message passing between agents
- Task delegation and result collection
- Error handling and recovery mechanisms

## Development Guidelines

### Code Organization
- The application is currently monolithic in a single HTML file
- Consider modularization if the application grows
- Maintain clean separation between HTML, CSS, and JavaScript sections
- Use semantic HTML5 elements for better structure

### Styling Conventions
- Dark theme with blue gradient accents
- Modern CSS with flexbox/grid layouts
- Responsive design principles
- Consistent color scheme and typography

### JavaScript Patterns
- Event-driven architecture for agent communications
- State management for agent status and conversations
- Error handling and user feedback
- Asynchronous operations for task execution

## Testing and Quality Assurance

### Current Testing Approach
- Manual testing through browser interface
- No automated testing framework currently in place
- Visual inspection of UI components and interactions

### Recommended Testing Practices
- Test agent creation and communication flows
- Verify error handling and edge cases
- Validate responsive design across different screen sizes
- Check performance with multiple concurrent agents

## Deployment

### Current Deployment
- Static HTML file - can be served by any web server
- No server-side requirements
- Can be opened directly in browser or hosted on static hosting services

### Hosting Options
- GitHub Pages
- Netlify
- Vercel
- Any static web hosting service

## Future Considerations

### Potential Enhancements
- Backend API for persistent data storage
- Authentication and user management
- Real agent API integration
- Modular code structure
- Automated testing framework

### Technical Debt
- Single-file architecture may become unwieldy
- No version management for dependencies
- Limited error reporting and debugging tools
- No automated build or deployment processes