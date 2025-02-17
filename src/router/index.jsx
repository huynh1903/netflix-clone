import CountryDetailPage from "@/pages/CountryDetail";
import CountryRootLayout from "@/pages/CountryRootLayout";
import GenreDetailPage from "@/pages/GenreDetail";
import GenreRootLayout from "@/pages/GenreRootLayout";
import HomePage from "@/pages/Home";
import InfoDetailPage from "@/pages/InfoDetail";
import InfoRootLayout from "@/pages/InfoRootLayout";
import ListDetailPage from "@/pages/ListDetail";
import ListRootLayout from "@/pages/ListRootLayout";
import PlayDetailPage from "@/pages/PlayDetail";
import PlayRootLayout from "@/pages/PlayRootLayout";
import RootLayout from "@/pages/RootLayout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    { path: '/', element: <RootLayout /> , children:[
        {index: true, element: <HomePage />},
        {path: 'list', element: <ListRootLayout />, children:[
            {path: ':listId', element: <ListDetailPage />},
        ]},
        {path: 'genre', element:<GenreRootLayout />, children:[
            {path: ':genreId', element: <GenreDetailPage />},
        ]},
        {path: 'country', element:<CountryRootLayout />, children:[
            {path: ':countryId', element: <CountryDetailPage />},
        ]},
        {path: 'play', element:<PlayRootLayout />, children:[
            {path: ':playId', element: <PlayDetailPage />},
        ]},
        {path:'info', element:<InfoRootLayout />, children:[
            {path: ':infoId', element: <InfoDetailPage />}
        ]}
    ]},
])