import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Plus, 
  Receipt, 
  Calendar, 
  DollarSign, 
  Filter,
  Download,
  Eye,
  Trash2,
  Edit
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'

// Sample data for expenses and receipts
const initialExpenses = [
  {
    id: 1,
    description: 'Office Supplies - Pens, Paper, Folders',
    amount: 245.50,
    date: '2024-07-23',
    category: 'Office Supplies',
    vendor: 'Office Depot',
    receiptNumber: 'RCP-001',
    status: 'Approved'
  },
  {
    id: 2,
    description: 'Construction Materials - Cement, Steel Bars',
    amount: 1250.00,
    date: '2024-07-22',
    category: 'Construction',
    vendor: 'BuildMart',
    receiptNumber: 'RCP-002',
    status: 'Pending'
  },
  {
    id: 3,
    description: 'Safety Equipment - Hard Hats, Safety Vests',
    amount: 380.75,
    date: '2024-07-21',
    category: 'Safety',
    vendor: 'SafetyFirst Co.',
    receiptNumber: 'RCP-003',
    status: 'Approved'
  },
  {
    id: 4,
    description: 'Tools - Drill Bits, Screwdrivers, Hammers',
    amount: 567.25,
    date: '2024-07-20',
    category: 'Tools',
    vendor: 'ToolWorld',
    receiptNumber: 'RCP-004',
    status: 'Approved'
  },
  {
    id: 5,
    description: 'Vehicle Maintenance - Oil Change, Tire Rotation',
    amount: 125.00,
    date: '2024-07-19',
    category: 'Vehicle',
    vendor: 'AutoCare Plus',
    receiptNumber: 'RCP-005',
    status: 'Approved'
  },
  {
    id: 6,
    description: 'Electrical Supplies - Wires, Switches, Outlets',
    amount: 445.80,
    date: '2024-07-18',
    category: 'Electrical',
    vendor: 'ElectroSupply',
    receiptNumber: 'RCP-006',
    status: 'Rejected'
  }
]

const categories = ['All', 'Office Supplies', 'Construction', 'Safety', 'Tools', 'Vehicle', 'Electrical']
const statusOptions = ['All', 'Approved', 'Pending', 'Rejected']

function ExpensesReceipts() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter expenses based on search term, category, and status
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory
      const matchesStatus = selectedStatus === 'All' || expense.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [expenses, searchTerm, selectedCategory, selectedStatus])

  // Calculate totals
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const approvedAmount = filteredExpenses.filter(e => e.status === 'Approved').reduce((sum, expense) => sum + expense.amount, 0)
  const pendingAmount = filteredExpenses.filter(e => e.status === 'Pending').reduce((sum, expense) => sum + expense.amount, 0)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-[var(--color-primary)]/20 text-[var(--color-primary)] border-[var(--color-primary)]/30'
      case 'Pending': return 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] border-[var(--color-secondary)]/30'
      case 'Rejected': return 'bg-[var(--color-destructive)]/20 text-[var(--color-destructive)] border-[var(--color-destructive)]/30'
      default: return 'bg-[var(--color-muted)]/20 text-[var(--color-muted)] border-[var(--color-muted)]/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Expenses & Receipts
          </h1>
          <p className="text-[var(--color-foreground)]/70 mt-2">Track all purchased materials and expenses</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:from-[var(--color-secondary)] hover:to-[var(--color-primary)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </motion.div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Expenses', amount: totalAmount, color: 'from-[var(--color-primary)] to-[var(--color-secondary)]', icon: DollarSign },
          { title: 'Approved', amount: approvedAmount, color: 'from-[var(--color-primary)] to-[var(--color-secondary)]', icon: Receipt },
          { title: 'Pending', amount: pendingAmount, color: 'from-[var(--color-primary)] to-[var(--color-secondary)]', icon: Calendar }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--color-foreground)]/70">{stat.title}</p>
                      <p className="text-2xl font-bold text-[var(--color-foreground)]">${stat.amount.toFixed(2)}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-[var(--color-card)] border-[var(--color-border)] shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--color-foreground)]/70" />
                <input
                  type="text"
                  placeholder="Search expenses, vendors, or receipt numbers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[var(--color-input)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/50 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--color-foreground)]/70" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-[var(--color-input)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] focus:border-[var(--color-primary)] focus:outline-none appearance-none cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 bg-[var(--color-input)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] focus:border-[var(--color-primary)] focus:outline-none appearance-none cursor-pointer"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <Button variant="outline" className="border-[var(--color-border)] text-[var(--color-foreground)]/70 hover:bg-[var(--color-card)] shadow-sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expenses Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-[var(--color-card)] border-[var(--color-border)] shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-[var(--color-foreground)]">
              Expense Records ({filteredExpenses.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-3 px-4 text-[var(--color-foreground)]/70 font-medium">Receipt #</th>
                    <th className="text-left py-3 px-4 text-[var(--color-foreground)]/70 font-medium">Description</th>
                    <th className="text-left py-3 px-4 text-[var(--color-foreground)]/70 font-medium">Vendor</th>
                    <th className="text-left py-3 px-4 text-[var(--color-foreground)]/70 font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-[var(--color-foreground)]/70 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-[var(--color-foreground)]/70 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-[var(--color-foreground)]/70 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-[var(--color-foreground)]/70 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredExpenses.map((expense, index) => (
                      <motion.tr
                        key={expense.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-card)]/50 transition-colors"
                      >
                        <td className="py-3 px-4 text-[var(--color-primary)] font-mono">{expense.receiptNumber}</td>
                        <td className="py-3 px-4 text-[var(--color-foreground)]">{expense.description}</td>
                        <td className="py-3 px-4 text-[var(--color-foreground)]/70">{expense.vendor}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-[var(--color-muted)] text-[var(--color-muted-foreground)] rounded-full text-xs">
                            {expense.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[var(--color-foreground)]/70">{expense.date}</td>
                        <td className="py-3 px-4 text-[var(--color-primary)] font-semibold">${expense.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(expense.status)}`}>
                            {expense.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" className="text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/20">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/20">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ExpensesReceipts




