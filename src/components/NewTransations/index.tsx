import Modal from 'react-modal';
import {Container, TransactionTypesContainer, RadioBox} from './styles';
import closeImg from '../../assets/close.svg';
import icomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

Modal.setAppElement('#root')

interface NewTransationPropos {
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransationModal({isOpen, onRequestClose}:NewTransationPropos){
    const [type, setType] = useState('deposit')
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('')

    const {createTransaction} = useTransactions()

async function handleCreateNewTransation(event: FormEvent){
//    colocar assincrono tanto aqui qto no contexto, colocar promisse na tipagem
    event.preventDefault()
   await createTransaction({
        title,
        amount,
        category,
        type
    })
// com funcao assíncrona, primeiro vai criar e depois fará codigo abaixo
    // resetar modal
    setTitle('');
    setAmount(0);
    setType('deposit');
    setCategory('');
    onRequestClose()
}
   
    return(
    <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">
            
        <button 
        type="button" 
        onClick={onRequestClose} className="react-modal-close" >
            <img src={closeImg} alt="closed" />
        </button>
          <Container onSubmit={handleCreateNewTransation}>
             <h1>Cadastrar alguma transação</h1>
             <input
             placeholder="Título"
             type="text"
             value={title}
             onChange={event => setTitle(event.target.value)}
             />
             <input
             placeholder="Título"
             type="number"
             value={amount}
             onChange={event => setAmount(Number(event.target.value))}

             />
             <TransactionTypesContainer>
                 < RadioBox
                 type="button"
                 onClick={() => {setType('deposit')}}
                 isActive={type ==='deposit'}
                 activeColor="green"
                 >
                     <img 
                     src={icomeImg} 
                     alt="Entrada" />
                     <span>Entrada</span>
                </RadioBox>
                 <RadioBox
                 type="button"
                 onClick={() => {setType('withdraw')}}
                 isActive={type ==='withdraw'}
                 activeColor="red"
                 >
                     <img src={outcomeImg} alt="Saída"/>
                     <span>Saída</span>
                 </RadioBox>
             </TransactionTypesContainer>
              <input
             placeholder="Categoria"
             type="text"
             value={category}
             onChange={event => setCategory(event.target.value)}

             />
             <button type="submit">Cadastrar</button>

         </Container>
    </Modal>
    );
}