type RegistrationPasswordAccount = {
    nickName: string | null
    firstName: string
    middleName: string
    lastName: string
    dateOfBirth: string
    gender: "f"|"m"
    phoneNumber: string
    postalCode: string
    city: string
    zip: string
    timeZone: string | null
    selectedBonusId: string | null
    countryCode: string
    currencyCode: string
    languageCode: string
    phoneCode: string
    state: string
    addressLine1: string
    addressLine2: string | null
    address: string
    email: string
    password: string
}

export type FrontendRegistration = {
    account: RegistrationPasswordAccount
    ipAddress: string | null
    affiliateProvider: string | null
    affiliateToken: string | null
    affiliateOfflineCode: string | null
    affiliateClickId: string | null
    affiliateWebsiteId: string | null
    affiliatePublisherId: string | null
    referredBy: string | null
    externalSystemId: string | null
    externalSystemUsername: string | null
    contactMe: boolean | null
    termsAndConditionsAccepted: boolean
    hcaptchaToken: string | null
}

type AffiliateDataResponse = {
    token: string
    affiliateProvider: string | null
    content: string
    affiliateId: string
    affiliateName: string
    affiliateGroupId: string
}

type CustomerPreferences = {
    preferredFiatCurrency: string
    preferredGameLaunchCurrency: string
    hidden: boolean
}

export type CustomerAccountResponse = {
    nickName: string | null
    firstName: string
    middleName: string | null
    lastName: string
    gender: string
    email: string
    countryCode: string
    ipCountryCode: string | null
    languageCode: string
    currencyCode: string
    phoneNumber: string
    phoneCode: string
    registrationDate: string
    address: string
    city: string
    zip: string
    dateOfBirth: string
    timeZone: string | null
    testAccount: boolean
    contactEmail: boolean
    contactSms: boolean
    customerId: string
    externalId: string | null
    affiliateData: AffiliateDataResponse | null
    preferences: CustomerPreferences | null
    status: string | null
    loginType: string | null
}

export type FrontendLogin ={
    email: string
    password: string
    nickname: string | null
    hcaptchaToken: string | null
}

type AccountPreferences = {
    zoneId: string
    languageCode: string
    preferredFiatCurrency: string
    preferredGameLaunchCurrency: string
    hidden: boolean
}

type CustomerDataBalance = {
    currency: string
    currencyPrecision: number
    balance: number
    bonusBalance: number
    vaultBalance: number
}

type CustomerDataKyc = {
    idvStatus: "NOT_VERIFIED" | "VERIFIED" | "PENDING"
    poaStatus: "NOT_VERIFIED" | "VERIFIED" | "PENDING"
    displayType: "string"|null
}

export type CustomerData = {
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
    accountPreferences: AccountPreferences | null
    communicationsVerified: boolean | null
    balances: CustomerDataBalance[] | null
    tokenRenewUrl: string
    currency: string
    mfaLogin: boolean
    mfaWithdrawal: boolean | null
    mfaStatus: 'NOT_SET' | 'ENABLED' | 'DISABLED'
    mfaReferenceId: string | null
    remind2FA: boolean | null
    kycData: CustomerDataKyc | null
    loginType: 'PASSWORD' | 'OTP' | 'BIOMETRIC'
}

