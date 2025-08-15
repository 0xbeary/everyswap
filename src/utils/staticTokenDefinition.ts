// Initialize a Token Definition with the attributes
export class StaticTokenDefinition {
    address: string
    symbol: string
    name: string
    decimals: number

    // Initialize a Token Definition with its attributes
    constructor(address: string, symbol: string, name: string, decimals: number) {
        this.address = address
        this.symbol = symbol
        this.name = name
        this.decimals = decimals
    }

    // Get all tokens with a static defintion
    static getStaticDefinitions(): Array<StaticTokenDefinition> {
        let staticDefinitions = new Array<StaticTokenDefinition>()

        // Add USDC.e
        let tokenUSDCe = new StaticTokenDefinition('0x552791be94b679cd0cefb35c8ab0364973acb37f', 'USDC.e', 'USDC.e', 6)
        staticDefinitions.push(tokenUSDCe)

        return staticDefinitions
    }

    // Helper for hardcoded tokens
    static fromAddress(tokenAddress: string): StaticTokenDefinition | null {
        let staticDefinitions = this.getStaticDefinitions()

        // Search the definition using the address
        for (let i = 0; i < staticDefinitions.length; i++) {
            let staticDefinition = staticDefinitions[i]
            if (staticDefinition.address === tokenAddress) {
                return staticDefinition
            }
        }

        // If not found, return null
        return null
    }
}
