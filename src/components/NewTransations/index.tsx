import Modal from 'react-modal';
import {Container, TransactionTypesContainer, RadioBox} from './styles';
import closeImg from '../../assets/close.svg';
import icomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState } from 'react';
import {api} from '../../services/api'

Modal.setAppElement('#root')

interface NewTransationPropos {
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransationModal({isOpen, onRequestClose}:NewTransationPropos){
    const [type, setType] = useState('deposit')
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('')

function handleCreateNewTransation(event: FormEvent){
    event.preventDefault()
   
    const data =({
        title,
        value,
        category,
        type
    })
    api.post('/transactions', data)
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
             value={value}
             onChange={event => setValue(Number(event.target.value))}

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