import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { CalendarIcon, ClockIcon, CarIcon, FileTextIcon, DownloadIcon } from 'lucide-react'

const ChecklistForm = ({ user, onGeneratePDF, onSaveToSheets }) => {
  const [formData, setFormData] = useState({
    // Cabeçalho
    chegada: false,
    redirecionamento: false,
    devolucao: false,
    rotina: false,
    data: '',
    hora: '',
    
    // Informações do veículo e observador
    observador: user || '',
    placa: '',
    modelo: '',
    locadora: '',
    km: '',
    cc: '',
    localidade: '',
    condutor: '',
    supervisor: '',
    telefone: '',
    
    // Irregularidades do veículo
    n_arranhado: false,
    o_amassado: false,
    x_quebrado: false,
    combustivel: '',
    
    // Acessórios
    bagag: false,
    antena: false,
    triangulo: false,
    macaco: false,
    ch_de_roda: false,
    farois_auxiliares: false,
    extintor: false,
    tapetes: false,
    lacre_placa: false,
    ar_cond: false,
    ventilador: false,
    radio: false,
    
    // Sistema elétrico
    falha_motor_partida: false,
    painel: false,
    buzina: false,
    luzes_internas: false,
    farol: false,
    limpador_de_para_brisa: false,
    setas: false,
    velocimetro: false,
    
    // Freios
    freios_baixo: false,
    freios_puxando: false,
    freios_trepidando: false,
    freios_nao_segura: false,
    
    // Eixo/Suspensão traseira
    eixo_puxando: false,
    eixo_trepidando: false,
    eixo_batendo: false,
    eixo_com_folga: false,
    eixo_arriado: false,
    
    // Motor/Refrigeração
    motor_sem_forca: false,
    motor_oleo_baixo: false,
    motor_batendo: false,
    motor_vazando_agua_oleo: false,
    motor_aquecendo: false,
    
    // Documento do veículo
    doct_vencido: false,
    doct_faltando: false,
    
    // Pneus
    pneus_dianteiros_bom: false,
    pneus_dianteiros_medio: false,
    pneus_dianteiros_ruim: false,
    pneus_traseiros_bom: false,
    pneus_traseiros_medio: false,
    pneus_traseiros_ruim: false,
    pneus_estepe_bom: false,
    pneus_estepe_medio: false,
    pneus_estepe_ruim: false,
    
    // Entrega e recebimento
    entregue_por: '',
    recebido_por: '',
    
    // Troca de veículo
    veiculo_substituido: '',
    
    // Anotações
    anotacoes: '',
    
    // Assinatura
    assinatura_condutor: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Dados do formulário:', formData)
    // Aqui será implementada a lógica de salvamento
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CarIcon className="w-6 h-6" />
            Checklist de Veículos Utilitários - C.P.M
          </CardTitle>
          <CardDescription>
            Preencha todos os campos obrigatórios para completar a inspeção do veículo
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Seção: Tipo de Operação */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tipo de Operação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="chegada"
                        checked={formData.chegada}
                        onCheckedChange={(checked) => handleInputChange('chegada', checked)}
                      />
                      <Label htmlFor="chegada">Chegada</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="redirecionamento"
                        checked={formData.redirecionamento}
                        onCheckedChange={(checked) => handleInputChange('redirecionamento', checked)}
                      />
                      <Label htmlFor="redirecionamento">Redirecionamento</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="devolucao"
                        checked={formData.devolucao}
                        onCheckedChange={(checked) => handleInputChange('devolucao', checked)}
                      />
                      <Label htmlFor="devolucao">Devolução</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="rotina"
                        checked={formData.rotina}
                        onCheckedChange={(checked) => handleInputChange('rotina', checked)}
                      />
                      <Label htmlFor="rotina">Rotina</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data e Hora</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="data"
                        type="date"
                        value={formData.data}
                        onChange={(e) => handleInputChange('data', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hora">Hora</Label>
                    <div className="relative">
                      <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="hora"
                        type="time"
                        value={formData.hora}
                        onChange={(e) => handleInputChange('hora', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Seção: Informações do Veículo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações do Veículo e Observador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="observador">Observador</Label>
                    <Input
                      id="observador"
                      value={formData.observador}
                      onChange={(e) => handleInputChange('observador', e.target.value)}
                      placeholder="Nome do observador"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="placa">Placa</Label>
                    <Input
                      id="placa"
                      value={formData.placa}
                      onChange={(e) => handleInputChange('placa', e.target.value)}
                      placeholder="ABC-1234"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modelo">Modelo</Label>
                    <Input
                      id="modelo"
                      value={formData.modelo}
                      onChange={(e) => handleInputChange('modelo', e.target.value)}
                      placeholder="Modelo do veículo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="locadora">Locadora</Label>
                    <Input
                      id="locadora"
                      value={formData.locadora}
                      onChange={(e) => handleInputChange('locadora', e.target.value)}
                      placeholder="Nome da locadora"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="km">KM</Label>
                    <Input
                      id="km"
                      type="number"
                      value={formData.km}
                      onChange={(e) => handleInputChange('km', e.target.value)}
                      placeholder="Quilometragem"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cc">C.C.</Label>
                    <Input
                      id="cc"
                      value={formData.cc}
                      onChange={(e) => handleInputChange('cc', e.target.value)}
                      placeholder="Centro de custo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localidade">Localidade</Label>
                    <Input
                      id="localidade"
                      value={formData.localidade}
                      onChange={(e) => handleInputChange('localidade', e.target.value)}
                      placeholder="Localidade"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condutor">Condutor</Label>
                    <Input
                      id="condutor"
                      value={formData.condutor}
                      onChange={(e) => handleInputChange('condutor', e.target.value)}
                      placeholder="Nome do condutor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supervisor">Supervisor</Label>
                    <Input
                      id="supervisor"
                      value={formData.supervisor}
                      onChange={(e) => handleInputChange('supervisor', e.target.value)}
                      placeholder="Nome do supervisor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seção: Irregularidades do Veículo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Irregularidades do Veículo</CardTitle>
                <CardDescription>
                  Marque as irregularidades encontradas: N = Arranhado, O = Amassado, X = Quebrado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="n_arranhado"
                        checked={formData.n_arranhado}
                        onCheckedChange={(checked) => handleInputChange('n_arranhado', checked)}
                      />
                      <Label htmlFor="n_arranhado">N - Arranhado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="o_amassado"
                        checked={formData.o_amassado}
                        onCheckedChange={(checked) => handleInputChange('o_amassado', checked)}
                      />
                      <Label htmlFor="o_amassado">O - Amassado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="x_quebrado"
                        checked={formData.x_quebrado}
                        onCheckedChange={(checked) => handleInputChange('x_quebrado', checked)}
                      />
                      <Label htmlFor="x_quebrado">X - Quebrado</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="combustivel">Combustível (1/2, 1/4, etc.)</Label>
                    <Input
                      id="combustivel"
                      value={formData.combustivel}
                      onChange={(e) => handleInputChange('combustivel', e.target.value)}
                      placeholder="Ex: 1/2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seção: Acessórios */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acessórios que o Carro Possui</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { id: 'bagag', label: 'Bagageiro' },
                    { id: 'antena', label: 'Antena' },
                    { id: 'triangulo', label: 'Triângulo' },
                    { id: 'macaco', label: 'Macaco' },
                    { id: 'ch_de_roda', label: 'Chave de Roda' },
                    { id: 'farois_auxiliares', label: 'Faróis Auxiliares' },
                    { id: 'extintor', label: 'Extintor' },
                    { id: 'tapetes', label: 'Tapetes' },
                    { id: 'lacre_placa', label: 'Lacre Placa' },
                    { id: 'ar_cond', label: 'Ar Condicionado' },
                    { id: 'ventilador', label: 'Ventilador' },
                    { id: 'radio', label: 'Rádio' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={item.id}
                        checked={formData[item.id]}
                        onCheckedChange={(checked) => handleInputChange(item.id, checked)}
                      />
                      <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <FileTextIcon className="w-4 h-4 mr-2" />
                Salvar Checklist
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => onGeneratePDF && onGeneratePDF(formData)}
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Gerar PDF
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChecklistForm

