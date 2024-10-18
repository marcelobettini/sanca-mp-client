import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
function Coffee() {
    const [preferendeId, setPreferenceId] = useState(null)
    initMercadoPago('APP_USR-f71afc05-bb69-41b9-b2de-d3033d093af4', { locale: 'es-AR' })

    const createPreference = async () => {
        try {
            const res = await fetch('https://sanca-mp-server.onrender.com/create-preference', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "Un Starbucks para el profe",
                    quantity: 1,
                    unit_price: 1450
                })
            })
            const parsed = await res.json()
            const { id } = parsed
            return id
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleBuyingProcess = async () => {
        const id = await createPreference()
        if (id) setPreferenceId(id)
    }
    return (
        <main><h2>Una cápsula Starbucks para el profe</h2>
            <button onClick={handleBuyingProcess} >Poniendo estaba la 🪿</button>
            {
                preferendeId &&

                <Wallet initialization={{ preferenceId: preferendeId }} customization={{ texts: { valueProp: 'smart_option' } }} />
            }
        </main>
    )
}

export default Coffee