import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { injectStore } from './config/axios'
import PreLoad from './components/preLoad'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Tránh trực tiếp injectStore vào codebase file, và cũng không dùng trực tiếp hook ở file không phải components
//  => injectStore vào interceptors
injectStore(store)
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      networkMode: 'always'
    }
  }
})
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<PreLoad />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
