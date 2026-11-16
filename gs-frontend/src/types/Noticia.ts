export type Noticia = {
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;

    source: {
        name: string;
    };
};

export type RespostaNoticias = {
    articles: Noticia[];
};