import { useSearchParams } from "react-router"

export function Products() {
    const [searchParams] = useSearchParams()
    const category = searchParams.get("category")

    return (
        <div>
            <h1>Products</h1>
            {
                category && (
                    <span>
                        Categoria<strong> {category} </strong>
                    </span>
                )
            }
        </div>
    )
}