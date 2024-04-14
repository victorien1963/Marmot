import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home, Register } from './pages'
import {
  AppWrapper,
  ContextProvider,
  Content,
  Making,
  Analyze,
  PayContent,
  Product,
  Brand,
  Cooperate,
  AdminProduct,
} from './components'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'

function App() {
  return (
    <div className="App">
      <Router>
        <ContextProvider>
          <AppWrapper>
            <Routes className="px-0">
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/content" element={<Content />} />
              <Route path="/user/making" element={<Making />} />
              <Route path="/user/analyze" element={<Analyze />} />
              <Route path="/user/paycontent" element={<PayContent />} />
              <Route path="/user/product" element={<Product />} />
              <Route path="/user/brand" element={<Brand />} />
              <Route path="/admin/cooperate" element={<Cooperate />} />
              <Route path="/admin/product" element={<AdminProduct />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </AppWrapper>
        </ContextProvider>
      </Router>
    </div>
  )
}

export default App
