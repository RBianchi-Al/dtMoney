import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import {useState} from 'react'
import {NewTransationModal} from './components/NewTransations'
import { TransactionProvider} from './hooks/useTransactions';


export function App() {
  const[isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransationModal(){
      setIsNewTransactionModalOpen(true)
  }
  function handleCloseNewTransationModal(){
      setIsNewTransactionModalOpen(false)
  }
  return (
    <TransactionProvider>
      <Header  onOpenNewTransactionModal={handleOpenNewTransationModal}/>
      <Dashboard/>     
      <NewTransationModal 
      isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseNewTransationModal}
      /> 
      <GlobalStyle/>
    </TransactionProvider>
  );
}

