import React, { useState } from 'react'
import './RecoveryAccount.css';

function RecoveryAccount() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);
    
    // Simulación de envío de solicitud de recuperación
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // En una aplicación real, aquí harías una llamada a tu API
      console.log(`Solicitud de recuperación enviada a: ${email}`);
    }, 1500);
  };

  const handleReset = () => {
    setEmail('');
    setIsSubmitted(false);
    setError('');
  };
    

  return (
    <div className="recovery-container">
      <div className="recovery-card">
        <div className="recovery-header">
         
          <h2>Recuperar tu cuenta</h2>
          <p className="subtitle">
            {isSubmitted 
              ? "Revisa tu bandeja de entrada" 
              : "Ingresa tu email para recibir instrucciones de recuperación"}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="recovery-form">
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <div className="input-container">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#9ca3af"/>
                </svg>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  required
                  disabled={isLoading}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                    </path>
                  </svg>
                  Enviando...
                </>
              ) : "Enviar instrucciones"}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#10b981"/>
                <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>¡Solicitud enviada!</h3>
            <p className="success-text">
              Hemos enviado un enlace de recuperación a <strong>{email}</strong>. 
              Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
            </p>
            <div className="success-actions">
              <button className="back-btn" onClick={handleReset}>
                Enviar a otro email
              </button>
              <a href="/login" className="login-link">
                Volver al inicio de sesión
              </a>
            </div>
            <div className="success-note">
              <p>¿No recibiste el correo?</p>
              <ul>
                <li>Revisa tu carpeta de spam o correo no deseado</li>
                <li>Asegúrate de que el email ingresado es correcto</li>
                <li>Intenta nuevamente en unos minutos</li>
              </ul>
            </div>
          </div>
        )}

        <div className="recovery-footer">
          <p>¿Recordaste tu contraseña? <a href="/login">Inicia sesión</a></p>
          <p>¿No tienes una cuenta? <a href="/signup">Regístrate</a></p>
        </div>
      </div>

      <div className="recovery-info">
        <h3>¿Qué pasa después?</h3>
        <div className="info-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Recibirás un correo</h4>
              <p>Te enviaremos un enlace de recuperación a tu dirección de email.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Haz clic en el enlace</h4>
              <p>El enlace te dirigirá a una página segura para restablecer tu contraseña.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Crea una nueva contraseña</h4>
              <p>Ingresa y confirma tu nueva contraseña para acceder a tu cuenta.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecoveryAccount