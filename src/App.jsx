import { useState } from 'react'
import Login from './components/Login.jsx'
import ChecklistFormComplete from './components/ChecklistFormComplete.jsx'
import GoogleSheetsConfig from './components/GoogleSheetsConfig.jsx'
import { generatePDF } from './utils/pdfGenerator.js'
import { saveToGoogleSheets } from './utils/googleSheetsIntegration.js'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [showSheetsConfig, setShowSheetsConfig] = useState(false)

  const handleLogin = (username) => {
    setUser(username)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handleGeneratePDF = async (formData) => {
    try {
      const result = await generatePDF(formData)
      if (result.success) {
        alert(`PDF gerado com sucesso: ${result.fileName}`)
      } else {
        alert(`Erro ao gerar PDF: ${result.error}`)
      }
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar PDF. Verifique o console para mais detalhes.')
    }
  }

  const handleSaveToSheets = async (formData) => {
    try {
      const scriptUrl = localStorage.getItem('googleScriptUrl')
      
      if (!scriptUrl) {
        const shouldConfigure = confirm('Google Sheets não configurado. Deseja configurar agora?')
        if (shouldConfigure) {
          setShowSheetsConfig(true)
          return
        } else {
          alert('Configure o Google Sheets primeiro para salvar os dados.')
          return
        }
      }

      const result = await saveToGoogleSheets(formData)
      if (result.success) {
        alert('Dados salvos no Google Sheets com sucesso!')
      } else {
        alert(`Erro ao salvar no Google Sheets: ${result.error}`)
      }
    } catch (error) {
      console.error('Erro ao salvar no Google Sheets:', error)
      alert('Erro ao salvar no Google Sheets. Verifique o console para mais detalhes.')
    }
  }

  const handleSheetsConfigSave = (config) => {
    setShowSheetsConfig(false)
    alert('Configuração do Google Sheets salva com sucesso!')
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Checklist de Veículos - C.P.M
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSheetsConfig(true)}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                Configurar Sheets
              </button>
              <span className="text-sm text-gray-600">
                Usuário: <span className="font-medium">{user}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="py-6">
        <ChecklistFormComplete 
          user={user}
          onGeneratePDF={handleGeneratePDF}
          onSaveToSheets={handleSaveToSheets}
        />
      </main>

      {showSheetsConfig && (
        <GoogleSheetsConfig
          onSave={handleSheetsConfigSave}
          onClose={() => setShowSheetsConfig(false)}
        />
      )}
    </div>
  )
}

export default App
