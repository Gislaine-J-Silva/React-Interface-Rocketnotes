import { Container } from "./styles";

export function Button({ title, loading = false, ...rest }){

    return(
        <Container 
            type="button"
            disabled={loading}
            {...rest} //qualquer outra propriedade que não tenha deixado explicito no argumento, mas tenha sido informado em index.jsx, vai ser inserida no componente.
        >
            { loading ? 'Carregando...' : title }
        </Container>
    );
}