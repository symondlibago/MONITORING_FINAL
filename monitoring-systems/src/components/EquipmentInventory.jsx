import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Plus, 
  Package, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Settings,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  User,
  Calendar,
  Wrench,
  Zap,
  Gauge,
  Grid3X3,
  List,
  MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const EquipmentInventory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [conditionFilter, setConditionFilter] = useState('All')
  const [viewMode, setViewMode] = useState('card') // 'card' or 'table'

  // Enhanced sample equipment data with new fields
  const equipment = [
    {
      id: 'EQ001',
      image: '🔧',
      name: 'Screwdriver Set',
      makeType: 'Stanley FatMax Pro',
      capacity: '6-piece set, 25 Nm torque',
      quantity: 5,
      condition: 'Good',
      presentLocation: 'Tool Storage Room A'
    },
    {
      id: 'EQ002',
      image: '🔨',
      name: 'Electric Drill',
      makeType: 'DeWalt DCD771C2',
      capacity: '20V Max, 1/2" Chuck, 300 UWO',
      quantity: 3,
      condition: 'Excellent',
      presentLocation: 'Workshop Section B'
    },
    {
      id: 'EQ003',
      image: '⛑️',
      name: 'Safety Helmet',
      makeType: 'MSA V-Gard',
      capacity: 'Class E, 20,000V protection',
      quantity: 10,
      condition: 'Good',
      presentLocation: 'Safety Equipment Locker'
    },
    {
      id: 'EQ004',
      image: '📏',
      name: 'Measuring Tape',
      makeType: 'Stanley PowerLock',
      capacity: '25ft length, 1" blade width',
      quantity: 8,
      condition: 'Good',
      presentLocation: 'Tool Storage Room A'
    },
    {
      id: 'EQ005',
      image: '⚙️',
      name: 'Circular Saw',
      makeType: 'Makita 5007MG',
      capacity: '7-1/4" blade, 15 Amp motor',
      quantity: 2,
      condition: 'Fair',
      presentLocation: 'Workshop Section C'
    },
    {
      id: 'EQ006',
      image: '🔨',
      name: 'Hammer Set',
      makeType: 'Estwing E3-16C',
      capacity: '16oz claw, Steel handle',
      quantity: 6,
      condition: 'Good',
      presentLocation: 'Tool Storage Room B'
    },
    {
      id: 'EQ007',
      image: '⚡',
      name: 'Angle Grinder',
      makeType: 'Bosch GWS13-50VSP',
      capacity: '5" disc, 13 Amp, 11,500 RPM',
      quantity: 4,
      condition: 'Excellent',
      presentLocation: 'Workshop Section A'
    },
    {
      id: 'EQ008',
      image: '📐',
      name: 'Level Set',
      makeType: 'Klein Tools 935RBLT',
      capacity: '48" aluminum, 3 vials',
      quantity: 5,
      condition: 'Good',
      presentLocation: 'Tool Storage Room A'
    },
    {
      id: 'EQ009',
      image: '🔩',
      name: 'Impact Wrench',
      makeType: 'Milwaukee 2767-20',
      capacity: '1/2" drive, 1000 ft-lbs torque',
      quantity: 3,
      condition: 'Excellent',
      presentLocation: 'Workshop Section B'
    },
    {
      id: 'EQ010',
      image: '🥽',
      name: 'Safety Goggles',
      makeType: '3M SecureFit SF400',
      capacity: 'Anti-fog, UV protection',
      quantity: 15,
      condition: 'Good',
      presentLocation: 'Safety Equipment Locker'
    },
    {
      id: 'EQ011',
      image: '🔥',
      name: 'Welding Machine',
      makeType: 'Lincoln Electric Power MIG 210',
      capacity: '208V, 210A output, MIG/Flux',
      quantity: 2,
      condition: 'Excellent',
      presentLocation: 'Welding Station'
    },
    {
      id: 'EQ012',
      image: '🪜',
      name: 'Extension Ladder',
      makeType: 'Werner D6228-2',
      capacity: '28ft extension, 250 lbs capacity',
      quantity: 4,
      condition: 'Good',
      presentLocation: 'Equipment Yard'
    }
  ]

  // Filter equipment based on search and filters
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.makeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.presentLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCondition = conditionFilter === 'All' || item.condition === conditionFilter
    
    return matchesSearch && matchesCondition
  })

  // Calculate statistics
  const totalItems = equipment.reduce((sum, item) => sum + item.quantity, 0)
  const excellentItems = equipment.filter(item => item.condition === 'Excellent').reduce((sum, item) => sum + item.quantity, 0)
  const goodItems = equipment.filter(item => item.condition === 'Good').reduce((sum, item) => sum + item.quantity, 0)

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'text-[var(--color-primary)]'
      case 'Good': return 'text-[var(--color-primary)]'
      case 'Fair': return 'text-[var(--color-secondary)]'
      case 'Poor': return 'text-[var(--color-destructive)]'
      default: return 'text-[var(--color-foreground)]/70'
    }
  }

  const getConditionBadge = (condition) => {
    switch (condition) {
      case 'Excellent': return 'bg-[var(--color-primary)]/20 text-[var(--color-primary)] border-[var(--color-primary)]/30'
      case 'Good': return 'bg-[var(--color-primary)]/20 text-[var(--color-primary)] border-[var(--color-primary)]/30'
      case 'Fair': return 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] border-[var(--color-secondary)]/30'
      case 'Poor': return 'bg-[var(--color-destructive)]/20 text-[var(--color-destructive)] border-[var(--color-destructive)]/30'
      default: return 'bg-[var(--color-muted)]/20 text-[var(--color-muted)] border-[var(--color-muted)]/30'
    }
  }

  const CardView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {filteredEquipment.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 + 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="group"
        >
          <Card className="bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 shadow-md">
            <CardContent className="p-6">
              {/* Equipment Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{item.image}</div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-foreground)]">{item.name}</h3>
                    <p className="text-sm text-[var(--color-foreground)]/70">{item.id}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs border ${getConditionBadge(item.condition)}`}>
                  {item.condition}
                </div>
              </div>

              {/* Equipment Details */}
              <div className="space-y-3 mb-4">
                {/* Make/Type */}
                <div className="flex items-start space-x-2 text-sm">
                  <Wrench className="h-4 w-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[var(--color-foreground)] font-medium">Make/Type:</p>
                    <p className="text-[var(--color-foreground)]/70 text-xs">{item.makeType}</p>
                  </div>
                </div>

                {/* Capacity */}
                <div className="flex items-start space-x-2 text-sm">
                  <Gauge className="h-4 w-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[var(--color-foreground)] font-medium">Capacity:</p>
                    <p className="text-[var(--color-foreground)]/70 text-xs">{item.capacity}</p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center space-x-2 text-sm">
                  <Package className="h-4 w-4 text-[var(--color-primary)]" />
                  <span className="text-[var(--color-foreground)]">Quantity:</span>
                  <span className="font-medium text-[var(--color-foreground)]">{item.quantity}</span>
                </div>

                {/* Present Location */}
                <div className="flex items-start space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[var(--color-foreground)] font-medium">Location:</p>
                    <p className="text-[var(--color-foreground)]/70 text-xs">{item.presentLocation}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t border-[var(--color-border)]">
                <Button size="sm" variant="outline" className="flex-1 border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-[var(--color-secondary)]/30 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/20">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="border-[var(--color-destructive)]/30 text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/20">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )

  const TableView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-[var(--color-card)] backdrop-blur-sm rounded-lg border border-[var(--color-border)] overflow-hidden shadow-md"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--color-card)] border-b border-[var(--color-border)]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--color-foreground)]/70">Image</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--color-foreground)]/70">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--color-foreground)]/70">Make/Type</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--color-foreground)]/70">Capacity</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--color-foreground)]/70">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--color-foreground)]/70">Condition</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--color-foreground)]/70">Present Location</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--color-foreground)]/70">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]/50">
            {filteredEquipment.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.4 }}
                className="hover:bg-[var(--color-card)]/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="text-2xl">{item.image}</div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-[var(--color-foreground)]">{item.name}</div>
                    <div className="text-sm text-[var(--color-foreground)]/70">{item.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-[var(--color-foreground)]/70">{item.makeType}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-[var(--color-foreground)]/70">{item.capacity}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-[var(--color-primary)]" />
                    <span className="font-medium text-[var(--color-foreground)]">{item.quantity}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs border ${getConditionBadge(item.condition)}`}>
                    {item.condition}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                    <span className="text-sm text-[var(--color-foreground)]/70">{item.presentLocation}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-[var(--color-secondary)]/30 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/20">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-[var(--color-destructive)]/30 text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/20">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Equipment Inventory
          </h1>
          <p className="text-[var(--color-foreground)]/70 mt-1">Track tools and equipment inventory</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-[var(--color-card)] rounded-lg p-1 border border-[var(--color-border)] shadow-sm">
            <Button
              size="sm"
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              onClick={() => setViewMode('card')}
              className={`${viewMode === 'card' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-foreground)]/70 hover:text-[var(--color-foreground)]'}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              onClick={() => setViewMode('table')}
              className={`${viewMode === 'table' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-foreground)]/70 hover:text-[var(--color-foreground)]'}`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:from-[var(--color-secondary)] hover:to-[var(--color-primary)] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Equipment
          </Button>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-[var(--color-card)] border-[var(--color-border)] shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-foreground)]/70">Total Items</p>
                <p className="text-3xl font-bold text-[var(--color-foreground)]">{totalItems}</p>
                <p className="text-sm text-[var(--color-primary)] mt-1">Equipment units</p>
              </div>
              <div className="p-3 bg-[var(--color-primary)]/20 rounded-lg">
                <Package className="h-8 w-8 text-[var(--color-primary)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-card)] border-[var(--color-border)] shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-foreground)]/70">Excellent Condition</p>
                <p className="text-3xl font-bold text-[var(--color-foreground)]">{excellentItems}</p>
                <p className="text-sm text-[var(--color-primary)] mt-1">Top quality</p>
              </div>
              <div className="p-3 bg-[var(--color-primary)]/20 rounded-lg">
                <CheckCircle className="h-8 w-8 text-[var(--color-primary)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-card)] border-[var(--color-border)] shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-foreground)]/70">Good Condition</p>
                <p className="text-3xl font-bold text-[var(--color-foreground)]">{goodItems}</p>
                <p className="text-sm text-[var(--color-primary)] mt-1">Serviceable</p>
              </div>
              <div className="p-3 bg-[var(--color-primary)]/20 rounded-lg">
                <Settings className="h-8 w-8 text-[var(--color-primary)]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[var(--color-card)] backdrop-blur-sm rounded-lg p-6 border border-[var(--color-border)] shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-foreground)]/70 h-4 w-4" />
              <Input
                placeholder="Search equipment, make/type, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[var(--color-input)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/50"
              />
            </div>
          </div>
          
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="px-3 py-2 bg-[var(--color-input)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)]"
          >
            <option value="All">All Conditions</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
      </motion.div>

      {/* Equipment Display */}
      {viewMode === 'card' ? <CardView /> : <TableView />}

      {/* No Results */}
      {filteredEquipment.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="h-16 w-16 text-[var(--color-foreground)]/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-foreground)]/70 mb-2">No equipment found</h3>
          <p className="text-[var(--color-foreground)]/50">Try adjusting your search criteria or filters</p>
        </motion.div>
      )}
    </div>
  )
}

export default EquipmentInventory




