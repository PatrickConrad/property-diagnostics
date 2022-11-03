import { ReactElement } from "react";
import Layout from "../layouts/_setLayout";

const setLayout = (page: ReactElement, title?: string, description?: string) => {
    const setTitle = title??'PDI Client Portal';
    const setDescription = description??"Authorization portal for Property Diagnostics clients";
    return (
        <Layout title={setTitle} description={setDescription}>
            {page}
        </Layout>
    );
}
export default setLayout