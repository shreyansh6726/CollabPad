import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:8080/api/auth';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'auth', 'home'
  const [isSignUp, setIsSignUp] = useState(true);
  const [user, setUser] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Status/Feedback states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Board list mock data
  const [boards, setBoards] = useState([
    { id: 1, name: '🚀 Q3 Roadmap Brainstorm', active: true },
    { id: 2, name: '🎨 UI Design System Spec', active: false },
    { id: 3, name: '🤝 Weekly Retro Workspace', active: false },
  ]);

  // Interactive Sticky Notes on Canvas
  const [notes, setNotes] = useState([
    { id: 1, text: 'Brainstorm layout ideas here!', color: 'yellow', x: 80, y: 150, author: '@alex' },
    { id: 2, text: 'Spring Boot Auth REST API is working! 🎉', color: 'blue', x: 380, y: 220, author: '@system' },
    { id: 3, text: 'Infinite digital whiteboard brings teams ideas to life.', color: 'pink', x: 200, y: 350, author: '@collab' },
  ]);

  const [activeTool, setActiveTool] = useState('select'); // 'select', 'sticky', 'draw', 'text'

  // Load user from localStorage if logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('collabpad_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentPage('home');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('collabpad_user');
    setUser(null);
    setCurrentPage('landing');
    setSuccess('');
    setError('');
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up API Call
        const response = await fetch(`${API_BASE_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong during sign up.');
        }

        setSuccess('Registration successful! Please login.');
        setIsSignUp(false); // Switch to Login form
        // Clear sign up inputs
        setName('');
        setEmail('');
        setPassword('');
      } else {
        // Login API Call
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Invalid username or password.');
        }

        // Save session
        localStorage.setItem('collabpad_user', JSON.stringify(data));
        setUser(data);
        setCurrentPage('home');
        // Clear login inputs
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Canvas Interactions
  const addStickyNote = (e) => {
    if (activeTool !== 'sticky') return;
    
    // Get mouse position relative to canvas
    const canvas = document.querySelector('.canvas-content');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - 100; // Offset by half note width
    const y = e.clientY - rect.top - 100;  // Offset by half note height

    const colors = ['yellow', 'pink', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newNote = {
      id: Date.now(),
      text: 'Double click to edit note text',
      color: randomColor,
      x: x > 0 ? x : 50,
      y: y > 0 ? y : 50,
      author: `@${user?.username || 'anonymous'}`
    };

    setNotes([...notes, newNote]);
    setActiveTool('select');
  };

  const updateNoteText = (id, newText) => {
    setNotes(notes.map(note => note.id === id ? { ...note, text: newText } : note));
  };

  return (
    <div className="app-container">
      {/* 1. Landing Page Navigation */}
      {currentPage !== 'home' && (
        <nav className="navbar">
          <div className="logo" onClick={() => setCurrentPage('landing')}>
            CollabPad <span className="logo-dot"></span>
          </div>
          <div className="nav-links">
            <span className="nav-link" onClick={() => setCurrentPage('landing')}>Product</span>
            <span className="nav-link" onClick={() => setCurrentPage('landing')}>Features</span>
            {currentPage === 'landing' ? (
              <>
                <button className="btn btn-secondary" onClick={() => { setIsSignUp(false); setCurrentPage('auth'); }}>Log In</button>
                <button className="btn btn-primary" onClick={() => { setIsSignUp(true); setCurrentPage('auth'); }}>Sign Up</button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={() => setCurrentPage('landing')}>Back to Home</button>
            )}
          </div>
        </nav>
      )}

      {/* 2. Landing Page Layout */}
      {currentPage === 'landing' && (
        <div className="landing-content">
          <header className="hero">
            <span className="hero-badge">Next-Gen Workspace</span>
            <h1>
              <span className="gradient-text">Infinite Visual Collab</span>
              for Ambitious Teams.
            </h1>
            <p className="hero-desc">
              CollabPad is an infinite digital whiteboard that brings your team’s ideas to life. 
              Say goodbye to fragmented feedback and static screenshots. Brainstorm, map workflows, 
              and collaborate visually with anyone, anywhere, instantly.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary btn-lg" onClick={() => { setIsSignUp(true); setCurrentPage('auth'); }}>
                Get Started for Free
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => { setIsSignUp(false); setCurrentPage('auth'); }}>
                Live Demo
              </button>
            </div>
          </header>

          <section className="features-section">
            <div className="section-header">
              <h2>Built for real-time creativity</h2>
              <p>Everything you need to turn inspiration into execution, unified on one single canvas.</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">♾️</div>
                <h3>Infinite Canvas</h3>
                <p>Never run out of space. Grow your board in any direction with rich assets, designs, templates, and mind-maps.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Instant Live Auth</h3>
                <p>Register instantly to create shared secure spaces. Keep your private mockups and design brainstorming protected.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3>Visual Feedback</h3>
                <p>Highlight specific board areas, place comment cards, and respond instantly with team visual indicators.</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 3. Auth Page (Login / Sign Up) */}
      {currentPage === 'auth' && (
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>{isSignUp ? 'Create your account' : 'Welcome back'}</h2>
              <p>{isSignUp ? 'Get started with your free CollabPad space' : 'Sign in to access your boards'}</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form className="auth-form" onSubmit={handleAuthSubmit}>
              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a unique username"
                  required
                />
              </div>

              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
              </button>
            </form>

            <div className="auth-toggle">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button className="auth-toggle-btn" onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); }}>
                {isSignUp ? 'Log In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Whiteboard Workspace (Post-Authentication) */}
      {currentPage === 'home' && user && (
        <div className="dashboard-container">
          <header className="dashboard-header">
            <div className="logo" onClick={() => setCurrentPage('landing')}>
              CollabPad <span className="logo-dot"></span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div className="user-profile">
                <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <span className="user-username">@{user.username}</span>
                </div>
              </div>
              <button className="btn btn-logout" onClick={handleLogout}>Log out</button>
            </div>
          </header>

          <div className="workspace-area">
            {/* Sidebar with boards list */}
            <aside className="sidebar">
              <div>
                <h4 className="sidebar-title">My Workspaces</h4>
                <div className="boards-list" style={{ marginTop: '1rem' }}>
                  {boards.map(b => (
                    <div 
                      key={b.id} 
                      className={`board-item ${b.active ? 'active' : ''}`}
                      onClick={() => setBoards(boards.map(x => ({ ...x, active: x.id === b.id })))}
                    >
                      📄 {b.name}
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>+ New Board</button>
            </aside>

            {/* Interactive Canvas */}
            <main className="whiteboard-canvas">
              {/* Whiteboard Toolbar */}
              <div className="canvas-toolbar">
                <button 
                  className={`tool-btn ${activeTool === 'select' ? 'active' : ''}`} 
                  onClick={() => setActiveTool('select')}
                  title="Select Tool"
                >
                  🖱️
                </button>
                <button 
                  className={`tool-btn ${activeTool === 'sticky' ? 'active' : ''}`} 
                  onClick={() => setActiveTool('sticky')}
                  title="Sticky Note (Click on canvas to place)"
                >
                  📝
                </button>
                <button 
                  className={`tool-btn ${activeTool === 'draw' ? 'active' : ''}`} 
                  onClick={() => setActiveTool('draw')}
                  title="Pen Draw Tool"
                >
                  ✏️
                </button>
                <button 
                  className={`tool-btn ${activeTool === 'text' ? 'active' : ''}`} 
                  onClick={() => setActiveTool('text')}
                  title="Text Card Tool"
                >
                  🔤
                </button>
              </div>

              {/* Canvas Workspace Area */}
              <div 
                className="canvas-content" 
                onClick={addStickyNote}
                style={{ cursor: activeTool === 'sticky' ? 'crosshair' : 'default' }}
              >
                {notes.map(note => (
                  <div
                    key={note.id}
                    className={`sticky-note sticky-${note.color}`}
                    style={{ left: `${note.x}px`, top: `${note.y}px` }}
                  >
                    <div className="sticky-header">Note</div>
                    <textarea
                      className="sticky-body"
                      value={note.text}
                      onChange={(e) => updateNoteText(note.id, e.target.value)}
                    />
                    <div className="sticky-author">{note.author}</div>
                  </div>
                ))}
              </div>

              <div className="canvas-hint">
                {activeTool === 'sticky' ? 'Click anywhere on canvas to drop a sticky note' : 'Select "Sticky" tool (📝) to add notes to the canvas!'}
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
