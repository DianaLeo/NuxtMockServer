type AccountPreferences = {
    zoneId: string
    languageCode: string
    preferredFiatCurrency: string
    preferredGameLaunchCurrency: string
    hidden: boolean
}

type Balance = {
    currency: string
    currencyPrecision: number
    balance: number
    bonusBalance: number
    vaultBalance: number
}

type KYCData = {
    idvStatus: 'NOT_VERIFIED' | 'VERIFIED' | 'PENDING'
    poaStatus: 'NOT_VERIFIED' | 'VERIFIED' | 'PENDING'
    displayType: 'IDV_EXPIRATION_REMINDER' | 'OTHER_TYPE'
}

export type User = {
    freeBets: string[]
    address: string
    phoneNumber: string
    city: string
    country: string
    countryISO3: string
    postalCode: string
    phoneCode: string
    customerId: string
    firstName: string
    lastName: string
    email: string
    password: string
    dateOfBirth: string
    accountPreferences: AccountPreferences
    communicationsVerified: boolean
    balances: Balance[]
    tokenRenewUrl: string
    currency: string
    mfaLogin: boolean
    mfaWithdrawal: boolean
    mfaStatus: 'NOT_SET' | 'ENABLED' | 'DISABLED'
    mfaReferenceId: string
    remind2FA: boolean
    kycData: KYCData
    loginType: 'PASSWORD' | 'OTP' | 'BIOMETRIC'
}

export interface Login {
    "email": string
    "password": string
    "nickname": string | null
    "hcaptchaToken": string | null
}
