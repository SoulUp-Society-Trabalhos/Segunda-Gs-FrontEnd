const API_URL = "/api";

export async function api(
    endpoint: string,
    options: RequestInit = {}
) {
    const resposta = await fetch(`${API_URL}${endpoint}`, {
        credentials: "include",
        ...options,
        headers: {
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers,
        },
    });

    if (!resposta.ok) {
        const dados = await resposta.json().catch(() => null);

        throw new Error(
            dados?.mensagem ||
            dados?.erro ||
            `Erro na requisição (${resposta.status})`
        );
    }

    return resposta;
}