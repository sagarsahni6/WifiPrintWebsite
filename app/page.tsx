'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  // Pairing Simulator States
  const [simStep, setSimStep] = useState<'pairing' | 'connecting' | 'dashboard' | 'printing' | 'completed'>('pairing');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState('HP LaserJet Pro');
  const [selectedDoc, setSelectedDoc] = useState('Annual_Report_2026.pdf');
  const [printProgress, setPrintProgress] = useState(0);
  const [printStatus, setPrintStatus] = useState('Connecting to spooler...');

  // Pairing validation handler
  const handlePairSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '582914') {
      setPinError(false);
      setSimStep('connecting');
    } else {
      setPinError(true);
    }
  };

  // Simulate local pairing discovery
  useEffect(() => {
    if (simStep === 'connecting') {
      const timer = setTimeout(() => {
        setSimStep('dashboard');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [simStep]);

  // Simulate progress when printing
  useEffect(() => {
    if (simStep === 'printing') {
      setPrintProgress(0);
      setPrintStatus('Initiating secure P2P TLS connection...');
      
      const interval = setInterval(() => {
        setPrintProgress((prev) => {
          const next = prev + 5;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setSimStep('completed');
            }, 600);
            return 100;
          }
          
          // Dynamic status updates based on progress
          if (next < 25) {
            setPrintStatus('Generating dynamic AES encryption keys...');
          } else if (next < 50) {
            setPrintStatus('Streaming document content over local network...');
          } else if (next < 75) {
            setPrintStatus('Windows Print Spooler assembling payload...');
          } else {
            setPrintStatus('Printer active - spooling paper feeds...');
          }
          
          return next;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [simStep]);

  return (
    <main>

    <header className="hero">
        <div className="container hero-container">
            <div className="hero-content fade-in">
                <div className="badge">Best Free Printing App for Android 2026</div>
                <h1>Print from Your Android Phone to Any PC Printer over Wi-Fi</h1>
                <p>Looking for a secure **Android to Windows PC Wi-Fi print app**? Connect your Android device directly to your Windows 10 or Windows 11 PC over local Wi-Fi and **print from your phone to a PC printer** instantly. No cloud, no cables, and 100% free. Perfect for printing PDFs, DOCX, images, and features a professional mobile document scanner.</p>
                <div className="hero-cta">
                    <a href="#download" className="btn btn-primary" aria-label="Download Android App">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22.64 7.53L12 2.22 1.36 7.53a1 1 0 0 0-.58.83v7.28a1 1 0 0 0 .58.83L12 21.78l10.64-5.31a1 1 0 0 0 .58-.83V8.36a1 1 0 0 0-.58-.83z"></path><polyline points="12 22 12 12"></polyline><polyline points="23 8 12 12 1 8"></polyline></svg>
                        Get Android App
                    </a>
                    <a href="#download" className="btn btn-secondary" aria-label="Download Desktop Server">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                        PC Server Download
                    </a>
                </div>
            </div>
            
            {/* Interactive Live Pairing Simulator Widget */}
            <div className="hero-image fade-in-delay">
                <div className="glass-panel main-panel sim-wrapper">
                    <div className="sim-header">
                        <div className="sim-title-container">
                            <span className="pulse-signal-dot"></span>
                            <span className="sim-title-txt">Local Discovery &amp; Connection Simulator</span>
                        </div>
                        <span className="sim-badge-item">Interactive Sandbox</span>
                    </div>
                    
                    <div className="sim-grid">
                        {/* Android Mobile Screen */}
                        <div className="sim-device sim-mobile">
                            <div className="mobile-speaker"></div>
                            <div className="mobile-inner-screen">
                                <div className="mobile-app-header">
                                    <span>🖨️ WiFi Print Mobile</span>
                                    <span className="battery-icon">🔋</span>
                                </div>
                                
                                {simStep === 'pairing' && (
                                    <div className="mobile-screen-body flex-center-col">
                                        <div className="phone-discovery-box">
                                            <div className="radar-ping"></div>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Scanning subnet...</span>
                                            <strong style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>PC-DESKTOP Found</strong>
                                        </div>
                                        <form onSubmit={handlePairSubmit} className="pin-form-layout">
                                            <label htmlFor="sim-pin" className="pin-label-txt">Enter PC Pairing PIN:</label>
                                            <input 
                                                type="text" 
                                                id="sim-pin"
                                                maxLength={6}
                                                placeholder="e.g. 582914" 
                                                value={pinInput}
                                                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                                                className={`pin-input-field ${pinError ? 'field-error' : ''}`}
                                            />
                                            {pinError && <p className="error-tip-msg">❌ Invalid PIN. Hint: Look at PC screen!</p>}
                                            
                                            <div className="pin-hint-box" onClick={() => setPinInput('582914')}>
                                                💡 Autofill matching PIN
                                            </div>
                                            
                                            <button type="submit" className="btn btn-primary btn-small w-full" style={{ marginTop: '0.5rem' }}>
                                                🔒 Connect &amp; Pair
                                            </button>
                                        </form>
                                    </div>
                                )}
                                
                                {simStep === 'connecting' && (
                                    <div className="mobile-screen-body flex-center-col">
                                        <div className="connecting-spinner"></div>
                                        <h4 style={{ fontSize: '1rem', marginTop: '1rem', color: 'var(--text-primary)' }}>Pairing...</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', margin: '0.5rem 0 0' }}>
                                            Exchanging local ECDSA cryptographic handshakes...
                                        </p>
                                    </div>
                                )}
                                
                                {simStep === 'dashboard' && (
                                    <div className="mobile-screen-body">
                                        <div className="console-card">
                                            <label className="console-label">Select File:</label>
                                            <select 
                                                value={selectedDoc} 
                                                onChange={(e) => setSelectedDoc(e.target.value)}
                                                className="console-select"
                                            >
                                                <option value="Annual_Report_2026.pdf">📄 Annual_Report_2026.pdf</option>
                                                <option value="ID_Card_Merged.pdf">🪪 ID_Card_Merged.pdf</option>
                                                <option value="Passport_Photo_Sheet.jpg">🖼️ Passport_Photo_Sheet.jpg</option>
                                            </select>
                                        </div>
                                        
                                        <div className="console-card" style={{ marginTop: '0.5rem' }}>
                                            <label className="console-label">Select PC Printer:</label>
                                            <select 
                                                value={selectedPrinter} 
                                                onChange={(e) => setSelectedPrinter(e.target.value)}
                                                className="console-select"
                                            >
                                                <option value="HP LaserJet Pro">🖨️ HP LaserJet Pro</option>
                                                <option value="Canon PIXMA G3010">🖨️ Canon PIXMA G3010</option>
                                                <option value="Epson EcoTank L3210">🖨️ Epson EcoTank L3210</option>
                                            </select>
                                        </div>
                                        
                                        <button 
                                            onClick={() => setSimStep('printing')} 
                                            className="btn btn-primary btn-small w-full pulse-glow-btn"
                                            style={{ marginTop: '1rem' }}
                                        >
                                            ⚡ Send Print Job
                                        </button>
                                    </div>
                                )}
                                
                                {simStep === 'printing' && (
                                    <div className="mobile-screen-body flex-center-col" style={{ justifyContent: 'center' }}>
                                        <div className="sending-indicator">📶</div>
                                        <h4 style={{ fontSize: '0.95rem', margin: '0.5rem 0', color: 'var(--text-primary)' }}>Uploading file...</h4>
                                        <div className="progress-outer"><div className="progress-inner" style={{ width: `${printProgress}%` }}></div></div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-color)', marginTop: '0.25rem' }}>{printProgress}% Sent</span>
                                    </div>
                                )}
                                
                                {simStep === 'completed' && (
                                    <div className="mobile-screen-body flex-center-col" style={{ justifyContent: 'center' }}>
                                        <span className="success-emoji-ring">✨</span>
                                        <h4 style={{ fontSize: '1rem', color: '#10b981', margin: '0.5rem 0 0' }}>Job Transmitted!</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                                            Safe offline Wi-Fi transfer completed.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Windows Desktop Server Screen */}
                        <div className="sim-device sim-desktop">
                            <div className="desktop-bar">
                                <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                                <span className="desktop-win-title">WiFi Print Desktop Server (PC)</span>
                            </div>
                            <div className="desktop-inner-screen">
                                <div className="win-server-banner">
                                    <span>🖥️ Local Host Active</span>
                                    <span className="server-status-pill">Running</span>
                                </div>
                                
                                {simStep === 'pairing' && (
                                    <div className="win-screen-body flex-center-col">
                                        <span className="win-lock-icon">🔑</span>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0' }}>Secure Pairing PIN:</p>
                                        <div className="pair-pin-display">582-914</div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', margin: '0.5rem 0 0' }}>
                                            Enter this code on your mobile device to establish P2P trust.
                                        </p>
                                    </div>
                                )}
                                
                                {simStep === 'connecting' && (
                                    <div className="win-screen-body flex-center-col">
                                        <div className="connecting-radar-pc"></div>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 600, marginTop: '0.5rem' }}>
                                            Accepting pairing token...
                                        </span>
                                    </div>
                                )}
                                
                                {simStep === 'dashboard' && (
                                    <div className="win-screen-body flex-center-col" style={{ justifyContent: 'center' }}>
                                        <span className="device-success-icon">✔️</span>
                                        <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: '0.5rem 0 0' }}>Android Device Paired</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                                            Ready to accept direct printing jobs over Wi-Fi.
                                        </p>
                                    </div>
                                )}
                                
                                {simStep === 'printing' && (
                                    <div className="win-screen-body">
                                        <div className="printing-job-box">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span className="spooler-spinner"></span>
                                                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Spooling: {selectedDoc}</strong>
                                            </div>
                                            <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0', fontStyle: 'italic' }}>
                                                {printStatus}
                                            </p>
                                            <div className="progress-outer" style={{ marginTop: '0.5rem', height: '4px' }}>
                                                <div className="progress-inner" style={{ width: `${printProgress}%`, background: '#10b981' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {simStep === 'completed' && (
                                    <div className="win-screen-body flex-center-col" style={{ padding: '1rem' }}>
                                        {/* CSS Simulated Printer Output */}
                                        <div className="css-printer-mockup">
                                            <div className="printer-top-slot"></div>
                                            <div className="printer-body-box">🖨️ {selectedPrinter}</div>
                                            <div className="printed-sheet-animate">
                                                <div className="printed-sheet-header">
                                                    <span>Success!</span>
                                                    <span>100% printed</span>
                                                </div>
                                                <div className="printed-sheet-content">
                                                    <p>{selectedDoc}</p>
                                                    <div className="content-bar"></div>
                                                    <div className="content-bar" style={{ width: '60%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => {
                                                setSimStep('pairing');
                                                setPinInput('');
                                            }}
                                            className="btn btn-secondary btn-small reset-sim-btn"
                                            style={{ marginTop: '0.5rem', fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                                        >
                                            🔄 Reset Connection Demo
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
    </header>

    <section id="about" className="section bg-darker">
        <div className="container">
            <div className="section-header fade-in">
                <h2>Why Choose WiFi Print for Your Wireless Printing Needs?</h2>
                <p>A reliable, brand-agnostic local-network printing solution designed for speed, total privacy, and cross-device ease of use.</p>
            </div>
            <div className="about-content fade-in">
                <p>In today's fast-paced environment, the ability to **print from your phone to a PC printer** shouldn't require bloated cloud setups, expensive brand-locked subscriptions, or uploading your confidential records to overseas databases. WiFi Print acts as a secure local bridge between your mobile device and your existing desktop printers over your private home or office local Wi-Fi router.</p>
                <p>Whether you need to quickly **print a PDF from your phone**, send a Microsoft Word DOCX report, or output high-resolution imagery, our local offline network print client coordinates it instantly. The Android app automatically discovers your Windows PC using standard Multicast DNS (mDNS) discovery. Once paired securely using a local 6-digit verification PIN, all device-to-device communication is fully encrypted with HTTPS (TLS) connections.</p>
                <p>By bypassing external cloud servers, WiFi Print secures maximum local router transfer speeds, zero latency, and absolute file privacy. It is the premier **free wireless printing app** designed to turn any printer connected to your computer—including USB-only legacy machines—into a wireless powerhouse without any cloud dependence.</p>
            </div>
        </div>
    </section>

    <section id="how-it-works" className="section">
        <div className="container">
            <div className="section-header fade-in">
                <h2>Simple 3-Step Setup</h2>
                <p>Discover how simple it is to print from your Android phone to a Windows PC printer.</p>
            </div>
            <div className="steps-grid">
                <div className="step-card fade-in">
                    <div className="step-number">1</div>
                    <div className="step-icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                    </div>
                    <h3>Launch PC Server</h3>
                    <p>Start our lightweight, local offline printer server on your Windows PC. It automatically recognizes all connected USB and network printers.</p>
                </div>
                <div className="step-card fade-in">
                    <div className="step-number">2</div>
                    <div className="step-icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    </div>
                    <h3>Pair Mobile App</h3>
                    <p>Open the Android print app. It automatically auto-discovers your host PC on the local network. Securely pair using the displayed 6-digit PIN.</p>
                </div>
                <div className="step-card fade-in">
                    <div className="step-number">3</div>
                    <div className="step-icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                    </div>
                    <h3>Print Local &amp; Fast</h3>
                    <p>Select your PDF, DOCX, image, or fresh camera scan. Customize printer parameters and send the file directly to your printer.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="scanner" className="section">
        <div className="container">
            <div className="section-header fade-in">
                <div className="badge">Free Mobile Print and Scan App</div>
                <h2>Turn Your Phone Into a Scanning Station</h2>
                <p>Capture physical documents, crop, align, and print them instantly with our advanced scanner framework.</p>
            </div>
            
            <div className="scanner-showcase fade-in">
                <div className="showcase-item">
                    <div className="phone-frame">
                        <div className="phone-notch"></div>
                        <div className="phone-screen phone-screen--doc">
                            <div className="scan-line"></div>
                            <div className="doc-viewfinder">
                                <div className="doc-paper">
                                    <div className="doc-line" style={{ width: "80%" }}></div>
                                    <div className="doc-line" style={{ width: "60%" }}></div>
                                    <div className="doc-line" style={{ width: "90%" }}></div>
                                    <div className="doc-line" style={{ width: "45%" }}></div>
                                    <div className="doc-line" style={{ width: "75%" }}></div>
                                    <div className="doc-line" style={{ width: "55%" }}></div>
                                </div>
                                <div className="detect-corner corner-tl"></div>
                                <div className="detect-corner corner-tr"></div>
                                <div className="detect-corner corner-bl"></div>
                                <div className="detect-corner corner-br"></div>
                            </div>
                            <div className="phone-hud">
                                <div className="hud-pill hud-pill--active">Auto Scan</div>
                                <div className="hud-capture-btn"><div className="hud-capture-inner"></div></div>
                                <div className="hud-pill">Manual</div>
                            </div>
                        </div>
                    </div>
                    <div className="showcase-label">
                        <div className="showcase-icon">
                            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                        </div>
                        <h3>AI Document Scanner</h3>
                        <p>Automatic page boundary intelligence, perspective warping, and auto-straightening. Capture and compile multi-page files instantly.</p>
                    </div>
                </div>

                <div className="showcase-item">
                    <div className="phone-frame">
                        <div className="phone-notch"></div>
                        <div className="phone-screen phone-screen--id">
                            <div className="id-viewfinder">
                                <div className="id-card id-card--front">
                                    <div className="id-photo-placeholder"></div>
                                    <div className="id-details">
                                        <div className="id-line id-line--name"></div>
                                        <div className="id-line id-line--short"></div>
                                        <div className="id-line id-line--short"></div>
                                    </div>
                                    <span className="id-label">FRONT SIDE</span>
                                </div>
                                <div className="id-merge-arrow">
                                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </div>
                                <div className="id-card id-card--back">
                                    <div className="id-stripe"></div>
                                    <div className="id-barcode">
                                        <div className="barcode-line"></div><div className="barcode-line"></div><div className="barcode-line"></div>
                                    </div>
                                    <span className="id-label">BACK SIDE</span>
                                </div>
                            </div>
                            <div className="phone-hud">
                                <div className="id-step-indicator">
                                    <span className="step-dot step-dot--done"></span>
                                    <span className="step-connector"></span>
                                    <span className="step-dot step-dot--active"></span>
                                </div>
                                <div className="hud-status">Combining dimensions...</div>
                            </div>
                        </div>
                    </div>
                    <div className="showcase-label">
                        <div className="showcase-icon">
                            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="17" y2="12"></line><line x1="7" y1="16" x2="13" y2="16"></line></svg>
                        </div>
                        <h3>Integrated ID Card Scanner</h3>
                        <p>Scan both faces of a driver's license or government ID card, and automatically assemble them on a single printable sheet.</p>
                    </div>
                </div>

                <div className="showcase-item">
                    <div className="phone-frame">
                        <div className="phone-notch"></div>
                        <div className="phone-screen phone-screen--photo">
                            <div className="photo-grid-preview">
                                <div className="photo-sheet">
                                    <div className="photo-cell"><div className="photo-avatar"></div></div>
                                    <div className="photo-cell"><div className="photo-avatar"></div></div>
                                    <div className="photo-cell"><div className="photo-avatar"></div></div>
                                    <div className="photo-cell"><div className="photo-avatar"></div></div>
                                    <div className="photo-cell"><div className="photo-avatar"></div></div>
                                    <div className="photo-cell"><div className="photo-avatar"></div></div>
                                </div>
                            </div>
                            <div className="phone-hud">
                                <div className="template-chips">
                                    <span className="template-chip">Passport</span>
                                    <span className="template-chip template-chip--active">Visa 2x2</span>
                                    <span className="template-chip">Wallet</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="showcase-label">
                        <div className="showcase-icon">
                            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        </div>
                        <h3>Official Passport Photo Templates</h3>
                        <p>Quickly snap a photo, align with templates (35x45mm passport, 2x2 inch visa), and auto-arrange a print grid to save paper.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="use-cases" className="section bg-darker">
        <div className="container">
            <div className="section-header fade-in">
                <h2>Engineered for Every Printing Scenario</h2>
                <p>Whether at home, in the classroom, or on the secure office floor, WiFi Print simplifies wireless document delivery.</p>
            </div>
            <div className="use-cases-grid">
                <div className="use-case-card fade-in">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="var(--primary-color)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="9" y="22" width="6" height="10"></rect></svg>
                        <h3 style={{ margin: "0" }}>Home Printing Solved</h3>
                    </div>
                    <p>Stop emailing links or PDF attachments to yourself just to print. Use WiFi Print to send boarding passes, receipts, and photos directly from your phone to your PC's default printer without leaving the couch. Works flawlessly with both wireless and traditional USB printers.</p>
                </div>
                <div className="use-case-card fade-in">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="var(--primary-color)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        <h3 style={{ margin: "0" }}>Secure Office Workflows</h3>
                    </div>
                    <p>Allow team members to print documents from their mobile devices without granting them unrestricted network directories or admin privileges. Cryptographically signed JWT pairing keys ensure only validated devices can queue print files on the host computer.</p>
                </div>
                <div className="use-case-card fade-in">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="var(--primary-color)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                        <h3 style={{ margin: "0" }}>Academic Convenience</h3>
                    </div>
                    <p>finalize assignments on your tablet or smartphone, and print them in seconds. Since the app supports DOCX and PDF, your formats remain perfect, and your document is ready at your printer tray the moment you walk to your desk.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="features" className="section">
        <div className="container">
            <div className="section-header fade-in">
                <h2>Advanced Toolsets &amp; Features</h2>
                <p>Everything you expect from the ultimate wireless printing framework.</p>
            </div>
            <div className="features-grid">
                <div className="feature-card fade-in">
                    <div className="feature-icon">📁</div>
                    <h3>Universal File Formats</h3>
                    <p>Natively queue standard PDFs, raw images, text documents. Integrates with local conversions for DOCX office files.</p>
                </div>
                <div className="feature-card fade-in">
                    <div className="feature-icon">📷</div>
                    <h3>HD Document Scanner</h3>
                    <p>Built-in AI filters, smart skew correction, and contrast adjustments for clean paper digital scans.</p>
                </div>
                <div className="feature-card fade-in">
                    <div className="feature-icon">🪪</div>
                    <h3>Smart ID Cards</h3>
                    <p>Combine front and back dimensions effortlessly. Eliminates double-printing and manual copy alignment.</p>
                </div>
                <div className="feature-card fade-in">
                    <div className="feature-icon">⚡</div>
                    <h3>mDNS Auto-Discovery</h3>
                    <p>Zero manual IP configurations. Open the mobile app and discover active server hosts in less than a second.</p>
                </div>
                <div className="feature-card fade-in">
                    <div className="feature-icon">🔒</div>
                    <h3>100% Offline Network</h3>
                    <p>Operates entirely locally. Your data remains in your router subnet—ideal for sensitive and high-privacy files.</p>
                </div>
                <div className="feature-card fade-in">
                    <div className="feature-icon">🔄</div>
                    <h3>SignalR Real-Time Ticks</h3>
                    <p>Stay updated. Monitor active print status, spool progress, and printer queues directly from your Android handset.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="technical-benefits" className="section">
        <div className="container">
            <div className="section-header fade-in">
                <h2>No Cloud. Just Speed &amp; Security.</h2>
                <p>Compare local peer-to-peer Wi-Fi channels against latency-prone remote servers.</p>
            </div>
            <div className="about-content fade-in">
                <p>**Sub-Second Local Speeds:** By utilizing your home router's 2.4GHz or 5GHz Wi-Fi bandwidth, WiFi Print side-steps the latency, lag, and upload times typical of cloud structures. High-resolution photos and heavy multi-page PDF documents are processed instantly at full LAN speed.</p>
                <p>**Immutable Document Security:** In an era of online tracking, WiFi Print sets the benchmark for local data ownership. Documents never bypass your network adapter or undergo cloud storage caching. All transactions are direct, authenticated with unique local pairing tokens, and protected under HTTPS.</p>
                <p>**Universal PC Printer Driver Compatibility:** Our lightweight desktop server acts as a universal interpreter. If your Windows 10 or 11 PC can spool to a printer (including old USB inkjets, plotters, thermal labels, or PDF writers), your Android phone can print to it immediately.</p>
            </div>
        </div>
        <div className="glow glow-3"></div>
    </section>

    <section id="printing-guide" className="section bg-darker">
        <div className="container">
            <article className="fade-in">
                <div className="section-header">
                    <div className="badge">Detailed Tutorial</div>
                    <h2>How to Print from Your Android Phone to Any PC Printer</h2>
                    <p>Follow our comprehensive walkthrough to configure local offline printing in under two minutes.</p>
                </div>
                <div className="about-content">
                    <p>Need to print school slides, tax files, or scanned receipts from your **Android device to a Windows PC printer**? Whether you own an HP LaserJet, Epson EcoTank, Canon PIXMA, Brother MFC, or any legacy printer connected via USB, WiFi Print makes wireless queues effortless.</p>
 
                    <h3>Step 1: Download &amp; Run the WiFi Print Windows Server</h3>
                    <p>Download the PC application from our <a href="#download">Downloads</a> section below. The server requires Windows 10 or 11 and runs on the modern, high-performance .NET 8 framework. Launch the server — it automatically identifies all printers installed in your Windows control panel and renders a unique 6-digit connection PIN on your desktop.</p>
 
                    <h3>Step 2: Connect the WiFi Print Android Application</h3>
                    <p>Install the mobile client on your **Android phone or tablet** (compatible with Android 8.0+). Connect both your smartphone and PC to the **same Wi-Fi router** (note: no active internet is required, just a local router connection). Launch the app: it will locate your host PC via mDNS. Tap the computer and input the 6-digit PIN displayed on your PC screen to establish secure, authenticated peer trust.</p>
 
                    <h3>Step 3: Select Your Documents &amp; Print Instantly</h3>
                    <p>Choose your files from three primary vectors:</p>
                    <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "2" }}>
                        <li><strong>File Browsing:</strong> Print PDFs, text logs, or standard images natively from your device storage.</li>
                        <li><strong>Built-in AI Scan:</strong> Capture physical pages, crop perspective skew, and queue the output straight to paper.</li>
                        <li><strong>ID Card Layout:</strong> Auto-merge both sides of government ID documents on one printable side.</li>
                        <li><strong>Direct Sharing:</strong> Select "Share to WiFi Print" from other mobile applications (WhatsApp, Drive, Gmail) to print directly.</li>
                    </ul>
                    <p>Choose your target printer, adapt page parameters (margins, grayscale vs color, landscape or portrait orientations, paper standards like A4 or Letter), and tap "Print". The file is spooled through your local network in seconds.</p>
 
                    <h3>Supported Printer Brands</h3>
                    <p>Because the spooling process leverages the host PC's drivers, WiFi Print natively supports **all printer brands**. This covers: **HP** (LaserJet, OfficeJet, Envy, SmartTank), **Canon** (PIXMA, MAXIFY, imageCLASS), **Epson** (EcoTank, WorkForce, Expression), **Brother** (MFC, HL, DCP), **Samsung**, **Lexmark**, **Xerox**, **Ricoh**, and **Kyocera**. If your Windows system can output to it, your phone is fully compatible.</p>
                </div>
            </article>
        </div>
    </section>

    <section id="comparison" className="section">
        <div className="container">
            <div className="section-header fade-in">
                <h2>Local Network vs. Cloud Services</h2>
                <p>Why local-first direct transmission is superior to traditional manufacturer utilities.</p>
            </div>
            <div className="about-content fade-in">
                <p>Ever since Google retired its unified **Google Cloud Print** service, printing from mobile devices has become fragmented and frustrating. Most brand-specific printer applications (like HP Smart, Canon PRINT, or Epson iPrint) require modern Wi-Fi-native printer hardware, constant cloud logins, bloated software sizes, and routing your personal documents through remote corporate systems.</p>
                <p>**WiFi Print returns control to the user.** By forming a secure direct bridge over your router, we ensure your documents remain confidential and your transfers remain lightning-fast. You don't need a high-tech "Wi-Fi printer" — as long as your printer is connected to your Windows computer via a basic USB cable, it is instantly unlocked for mobile wireless printing!</p>
                <p>Enjoy an experience with **no accounts, no usage caps, no subscription gates, and 100% offline capability**. Ideal for secure offices, bank branches, schools, or homes where security is the default priority.</p>
            </div>
        </div>
    </section>

    <section id="faq" className="section">
        <div className="container">
            <div className="section-header fade-in">
                <h2>Frequently Asked Questions</h2>
                <p>Find answers to common questions about the best free local print server.</p>
            </div>
            <div className="faq-grid">
                <details className="faq-item fade-in">
                    <summary>How do I print from my Android phone to my Windows PC?</summary>
                    <p>It's incredibly simple! First, run the WiFi Print Server application on your Windows 10 or Windows 11 computer. Next, open the WiFi Print app on your Android device (ensure both are connected to the same Wi-Fi network). The app will automatically discover your PC. Enter the pairing PIN, select your document (PDF, DOCX, or Image), and tap print. Your file is sent instantly over your local network to the selected printer.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>Do I need an active internet connection or cloud service?</summary>
                    <p>No, absolutely not. Unlike Google Cloud Print or manufacturer-specific remote printing apps, WiFi Print operates entirely on your local Wi-Fi network (LAN). Your files never leave your home or office network, making it a highly secure, private, and offline-capable printing solution.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>Which file formats are supported for wireless printing?</summary>
                    <p>The Android printing app supports a wide variety of formats. You can natively print PDF files, standard images (JPEG, PNG, WebP), and plain text files. Furthermore, if you install LibreOffice on your Windows PC, the server can automatically convert and print Microsoft Word documents (DOCX, DOC) sent from your phone.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>Can I scan documents directly with the app?</summary>
                    <p>Yes! The WiFi Print Android app includes a full-featured document scanner. It uses AI to detect document edges, correct perspective, and crop out backgrounds. You can scan multi-page documents or use the special ID Card mode to print both sides of an ID on a single page.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>Is the connection between my phone and PC secure?</summary>
                    <p>Yes. The connection between the Android client and the Windows server is secured using HTTPS with automatically generated self-signed certificates. After the initial PIN pairing process, all subsequent communication and file transfers are authenticated using JSON Web Tokens (JWT), ensuring that only authorized devices can send print jobs to your computer.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>How do I print from my Android phone to an HP printer?</summary>
                    <p>If your HP printer (LaserJet, DeskJet, OfficeJet, or Envy) is installed on your Windows PC, simply run the WiFi Print Server. The Android app discovers all installed printers on your PC, including HP models. Select your HP printer from the list, choose your document, and print — no HP Smart app required.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>Can I print from my phone without a wireless printer?</summary>
                    <p>Yes! This is one of WiFi Print's biggest advantages. Your printer doesn't need to be a "wireless printer" at all. Even a basic USB-only printer connected to your Windows PC works perfectly. WiFi Print sends the file from your phone to your PC over Wi-Fi, and your PC handles the actual printing to the connected printer. This means you can wirelessly print to any printer, including old or budget models.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>How do I print a PDF from my phone to my computer?</summary>
                    <p>Open the WiFi Print app, browse or share the PDF file from any app, select your PC's printer, adjust settings (copies, color, paper size), and tap Print. The PDF is transferred at full speed over your local Wi-Fi and printed instantly. WiFi Print handles standard PDF files natively without any conversion.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>What is the best free printing app for Android in 2026?</summary>
                    <p>WiFi Print is one of the top-rated free printing apps for Android in 2026. Unlike manufacturer apps (HP Smart, Canon PRINT) that only work with specific printers, WiFi Print works with any printer connected to a Windows PC. It's completely free, open source, and includes a built-in document scanner, ID card scanner, and passport photo templates — all without ads or subscriptions.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>How to connect my Android phone to my Windows printer?</summary>
                    <p>Ensure both your phone and PC are on the same Wi-Fi network. Run the WiFi Print Server on your PC (it shows a PIN). Open WiFi Print on your phone — it will auto-discover your PC using mDNS technology. Tap to connect, enter the 6-digit PIN, and you're paired. The entire process takes less than 30 seconds.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>How do I scan documents and print them from my phone?</summary>
                    <p>WiFi Print includes a full-featured document scanner powered by AI edge detection. Open the app, select "Scan", point your camera at the document, and it will automatically detect edges, correct perspective, and enhance quality. You can scan multiple pages into a single PDF. Then simply select your printer and tap Print — the scanned document goes directly from your phone's camera to paper.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>Is WiFi Print safe for printing confidential documents?</summary>
                    <p>Absolutely. WiFi Print is designed with security as a priority. All communication between your phone and PC is encrypted using HTTPS (TLS). Authentication is handled via JSON Web Tokens (JWT) after a secure PIN pairing. Most importantly, your documents never leave your local network — no cloud server, no third-party processing. This makes it suitable for printing financial records, medical documents, legal papers, and other sensitive information.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>What printers are compatible with WiFi Print?</summary>
                    <p>WiFi Print is compatible with every printer that is installed on your Windows PC. This includes HP, Canon, Epson, Brother, Samsung, Lexmark, Xerox, Ricoh, Kyocera, and any other brand. It supports USB printers, network printers, and virtual printers. The app communicates with your PC, which then handles the printing using the standard Windows print system.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>How to print passport photos from my phone?</summary>
                    <p>WiFi Print includes built-in photo templates for passport photos (35×45mm), visa photos (2×2 inch), and wallet-sized photos. Take a photo with your phone's camera, select the desired template, and the app automatically arranges multiple copies in a grid layout on a single A4 sheet. This saves paper and ensures standard compliance for official documents.</p>
                </details>
                <details className="faq-item fade-in">
                    <summary>Does WiFi Print work without internet?</summary>
                    <p>Yes. WiFi Print requires only a local Wi-Fi connection (a router connecting your phone and PC). No internet access is needed at any point. This makes it perfect for use in areas with poor connectivity, restricted networks (schools, offices, government buildings), or when you simply want to keep your printing completely offline and private.</p>
                </details>
            </div>
        </div>
    </section>

    <section id="download" className="section cta-section bg-darker">
        <div className="container">
            <div className="cta-box fade-in">
                <h2>Ready to Start Wireless Printing?</h2>
                <p>Download the Android application and the desktop server client to unlock instant printing.</p>

                <div className="both-required-badge">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    <span><strong>Double Components Required</strong> — You will need the mobile client and the PC host companion to spool files locally.</span>
                </div>

                <div className="setup-visual">
                    <div className="setup-component">
                        <div className="setup-icon">📱</div>
                        <span>Android App</span>
                    </div>
                    <div className="setup-connector">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        <span className="setup-wifi-label">Local Router (Wi-Fi)</span>
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    </div>
                    <div className="setup-component">
                        <div className="setup-icon">🖥️</div>
                        <span>PC Server Host</span>
                    </div>
                    <div className="setup-connector setup-connector--result">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                    <div className="setup-component">
                        <div className="setup-icon">🖨️</div>
                        <span>Printers</span>
                    </div>
                </div>

                <div className="download-grid">
                    <div className="download-card">
                        <h3 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                            Android App Client
                        </h3>
                        <p>Supports Android 8.0 Oreo, 9, 10, 11, 12, 13, 14+</p>
                        <a href="#" className="btn btn-primary w-full" aria-label="Download Android App APK file">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download Mobile APK
                        </a>
                        <p className="download-cross-ref">👉 You'll also need the <a href="#download-server-card"><strong>Windows Server Host</strong></a> to print.</p>
                    </div>
                    <div className="download-card" id="download-server-card">
                        <h3 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                            Windows Server Host
                        </h3>
                        <p>Windows 10 / Windows 11 (.NET 8 Runtime required)</p>
                        <a href="#" className="btn btn-secondary w-full" aria-label="Download Windows Server companion file">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download PC Installer
                        </a>
                        <p className="download-cross-ref">👉 You'll also need the <a href="#download"><strong>Android Mobile Client</strong></a> to pair.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </main>
  );
}