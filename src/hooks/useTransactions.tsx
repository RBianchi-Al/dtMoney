import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// crar uma interface que vai herdar da anterior td menos id e createdat. O Pickt faz o inverso
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionProviderProps {
        children: ReactNode
}

interface TransactionContextData{
    transactions:Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData  //forçar tipagem pois erro não corrige
    
);


// para o componentes ter acesso, precisa envelopar com provider. Colcocar no APP

export function TransactionProvider({children}: TransactionProviderProps) {
    const [transactions, setTransaction] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransaction(response.data.transactions))
    }, [])

    // criar informação tem que colocar para retornar, 
async function createTransaction(transactionInput: TransactionInput){
  //   para acessar api, colocar em uma constante response, colocar data para não dar erro
       const response = await api.post('/transactions', {
           ...transactionInput,
           createdAt: new Date(),
        })
    
    //    acessar a resposta de transactions, 
       const {transaction} = response.data;
    //    adicionar uma informação usando conceito de imutabilidade e rest
       setTransaction([
           ...transactions,
           transaction,
       ]);
    }


    // tem que colocar cm objeto duas chaves e criar interface TransactionContextData falando que vai retornar essas duas funções
    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}


// criando hooks para melhorar chamada de transactions
export function useTransactions(){
    const context = useContext(TransactionsContext);
    return context;
}