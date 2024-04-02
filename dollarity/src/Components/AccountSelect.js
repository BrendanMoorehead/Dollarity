import { Select } from 'antd';

const { Option, OptGroup } = Select;

const AccountSelect = ({defaultAccount, accounts, onChange}) => {
    const types = [...new Set(accounts.map(account => account.type))];
  // Grouping accounts by type
  const groupedAccounts = types.map(type => ({
    label: <span>{type}</span>,
    title: type.toLowerCase(),
    options: accounts
      .filter(account => account.type === type)
      .map(account => ({
        label: <span>{account.name}</span>,
        value: account.id.toString()
      }))
  }));

  return (
    <Select

      showSearch
      style={{ width: 200 }}
      placeholder="Select an account"
      options={groupedAccounts}
      onChange={onChange}
      defaultValue={defaultAccount.name}
    />
  );
}

export default AccountSelect