import "./fime-info.css"
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

function Filme() {
    const { id } = useParams()
    const navigate = useNavigate();

    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("r-api/?api=filmes/" + id)

            if (response.data.length === 0) {
                //Tentou acessar com um ID que não existe, redirecionando ele para home !
                navigate("/")
                return
            }

            setFilme(response.data)
            setLoading(false)
        }

        loadFilmes()
    }, [navigate, id])

    function salvaFilme() {
        const minhaLista = localStorage.getItem("filmes")
        let filmesSalvos = JSON.parse(minhaLista) || []

        //Se tiver algum filme salvo com esse mesmo id precisa ignorar

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if (hasFilme) {
            toast.error("Você já possui esse filme salvo.")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("filmes", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso")
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando seu filme...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className="botoes">
                <button onClick={() => { salvaFilme() }}>Favorito</button>
                <button>
                    <a target="_blank" rel="noreferrer" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme