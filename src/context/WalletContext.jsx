import { createContext, useContext, useState, useCallback } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

const WalletContext = createContext()

export function useWallet() {
  return useContext(WalletContext)
}

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [balance, setBalance] = useState(null)

  // BSC Chain ID = 56 (mainnet) or 97 (testnet)
  const BSC_CHAIN_ID = 97 // Using testnet for development
  const BSC_RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'

  const connectWallet = useCallback(async () => {
    if (isConnecting) return
    
    try {
      setIsConnecting(true)
      
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        theme: 'dark',
      })
      
      const instance = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(instance)
      const signer = provider.getSigner()
      const network = await provider.getNetwork()
      const accounts = await provider.listAccounts()
      const balance = await provider.getBalance(accounts[0])
      
      setAccount(accounts[0])
      setProvider(provider)
      setSigner(signer)
      setChainId(network.chainId)
      setBalance(ethers.utils.formatEther(balance))
      
      if (network.chainId !== BSC_CHAIN_ID) {
        toast.warning('Please switch to Binance Smart Chain Testnet')
        await switchToBSC()
      }
      
      instance.on('accountsChanged', (accounts) => {
        setAccount(accounts[0])
        window.location.reload()
      })
      
      instance.on('chainChanged', () => {
        window.location.reload()
      })
      
      toast.success('Wallet connected successfully!')
    } catch (error) {
      console.error('Error connecting wallet:', error)
      toast.error('Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }, [isConnecting])

  const disconnectWallet = useCallback(async () => {
    setAccount(null)
    setProvider(null)
    setSigner(null)
    setChainId(null)
    setBalance(null)
    
    localStorage.removeItem('walletconnect')
    localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER')
    
    toast.info('Wallet disconnected')
  }, [])

  const switchToBSC = async () => {
    if (!window.ethereum) return
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${BSC_CHAIN_ID.toString(16)}` }],
      })
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${BSC_CHAIN_ID.toString(16)}`,
                chainName: 'Binance Smart Chain Testnet',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: [BSC_RPC_URL],
                blockExplorerUrls: ['https://testnet.bscscan.com/'],
              },
            ],
          })
        } catch (addError) {
          console.error('Error adding BSC chain', addError)
        }
      }
    }
  }

  const connectWalletOnPageLoad = useCallback(async () => {
    if (window.localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')) {
      await connectWallet()
    }
  }, [connectWallet])

  const sendPayment = async (to, amount) => {
    if (!signer) {
      toast.error('Please connect your wallet first')
      return null
    }
    
    try {
      const tx = await signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(amount),
      })
      
      return tx
    } catch (error) {
      console.error('Transaction error:', error)
      toast.error('Transaction failed')
      return null
    }
  }

  const value = {
    account,
    provider,
    signer,
    chainId,
    balance,
    isConnecting,
    connectWallet,
    disconnectWallet,
    connectWalletOnPageLoad,
    sendPayment,
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}