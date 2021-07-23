import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import { api } from '../../services/api';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps) {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState(0);
    const [type, setType] = useState("deposit");
    const [category, setCategory] = useState("");

    function handleCreateNewTreansaction (event: FormEvent) {
        event.preventDefault();

        const data = {
            title, 
            value, 
            type, 
            category,
        }

        api.post('/transactions', data)
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={onRequestClose} 
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTreansaction}>
                <h2>New transaction</h2>

                <input 
                    type="text"
                    placeholder="Title" 
                    onChange={(event) => setTitle(event.target.value)} 
                />
                
                <input 
                    type="number"
                    placeholder="Value" 
                    onChange={(event) => setValue(Number(event.target.value))} 
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button" 
                        onClick={() => setType("deposit")}
                        isActive={type === "deposit"}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button" 
                        onClick={() => setType("withdraw")}
                        isActive={type === "withdraw"}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    type="text"
                    placeholder="Category" 
                    onChange={(event) => setCategory(event.target.value)} 
                />

                <button type="submit">Submit</button>
            </Container>
        </Modal>
    )
}