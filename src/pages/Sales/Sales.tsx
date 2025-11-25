import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { DollarSign, TrendingUp, ShoppingCart, Users } from "lucide-react";

const Sales: React.FC = () => {
  const { t } = useTranslation();

  const salesData = [
    {
      id: 1,
      product: "Notebook Pro",
      client: "Cliente A",
      amount: 2500,
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      product: "Smartphone Max",
      client: "Cliente B",
      amount: 1200,
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: 3,
      product: "Tablet Lite",
      client: "Cliente C",
      amount: 800,
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 4,
      product: 'Monitor 24"',
      client: "Cliente D",
      amount: 900,
      date: "2024-01-13",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("sales")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie todas as vendas e pedidos
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Vendas do Mês
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                R$ 45.230
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-xl">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pedidos
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                156
              </p>
            </div>
            <div className="p-3 bg-blue-500 rounded-xl">
              <ShoppingCart size={24} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Clientes Ativos
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                89
              </p>
            </div>
            <div className="p-3 bg-purple-500 rounded-xl">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Crescimento
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                +12.5%
              </p>
            </div>
            <div className="p-3 bg-orange-500 rounded-xl">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Vendas Recentes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Produto
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Cliente
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Valor
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Data
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                >
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    #{sale.id.toString().padStart(5, "0")}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {sale.product}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {sale.client}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    R$ {sale.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {sale.date}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        sale.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {sale.status === "completed" ? "Concluído" : "Pendente"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Sales;
