import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { AlertCircle, Settings, ExternalLink } from 'lucide-react'
import { getGoogleAppsScriptInstructions } from '../utils/googleSheetsIntegration.js'

const GoogleSheetsConfig = ({ onSave, onClose }) => {
  const [config, setConfig] = useState({
    scriptUrl: localStorage.getItem('googleScriptUrl') || '',
    spreadsheetId: localStorage.getItem('spreadsheetId') || ''
  })
  const [showInstructions, setShowInstructions] = useState(false)

  const handleSave = () => {
    localStorage.setItem('googleScriptUrl', config.scriptUrl)
    localStorage.setItem('spreadsheetId', config.spreadsheetId)
    onSave(config)
  }

  const handleInputChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuração Google Sheets
          </CardTitle>
          <CardDescription>
            Configure a integração com Google Sheets para salvar os dados automaticamente
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scriptUrl">URL do Google Apps Script</Label>
              <Input
                id="scriptUrl"
                value={config.scriptUrl}
                onChange={(e) => handleInputChange('scriptUrl', e.target.value)}
                placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="spreadsheetId">ID da Planilha Google Sheets</Label>
              <Input
                id="spreadsheetId"
                value={config.spreadsheetId}
                onChange={(e) => handleInputChange('spreadsheetId', e.target.value)}
                placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
              />
              <p className="text-sm text-gray-500">
                Encontre o ID na URL da sua planilha: docs.google.com/spreadsheets/d/<strong>ID_AQUI</strong>/edit
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Primeira vez configurando?</p>
                <p>Você precisa criar um Google Apps Script para receber os dados. Clique no botão abaixo para ver as instruções completas.</p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {showInstructions ? 'Ocultar' : 'Ver'} Instruções de Configuração
          </Button>

          {showInstructions && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instruções Completas</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={getGoogleAppsScriptInstructions()}
                  readOnly
                  rows={20}
                  className="font-mono text-xs"
                />
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Salvar Configuração
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GoogleSheetsConfig

