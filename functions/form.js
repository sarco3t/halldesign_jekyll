function format({
    clientName, room, details,phoneNumber
}) {
    const template = `
    Client left a message: \n\n
        client name: ${clientName}\n\n
        room area: ${room} m2\n\n
        phone number: ${phoneNumber} \n\n
        created at: ${new Date().toString()} \n\n
        details: ${details ? details : ""} \n\n
    `
    return template
}

export async function onRequestPost({ request, env } ) {
    
    const body = await request.json()
    console.log(body)
    const text = format(body)
    const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_ID}/sendMessage`, {
      method: "POST",
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text
      }),
      headers: {
        "Content-Type": "application/json"
      }  
    })
    if (response.status > 200) {
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
        });
    }
    return new Response()

}