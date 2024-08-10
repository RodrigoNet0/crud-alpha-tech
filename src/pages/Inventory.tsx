import { useEffect } from "react";
import { useInventoryStore } from "@/stores/inventoryStore";
import SearchBar from "@/components/Communs/Searchbar";
import ItemCard from "@/components/Card/ItemCard";
import ItemEditModal from "@/components/Modals/EditModal";
import ItemFormModal from "@/components/Modals/AddModal";
import UserMenu from "@/components/Communs/UserMenu";

export default function InventoryPage() {
  const {
    inventory,
    searchTerm,
    setSearchTerm,
    fetchItems,
    handleItemAdded,
    handleDeleteItem
  } = useInventoryStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredInventory = inventory.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row-reverse justify-between items-center h-full w-full mb-6">
          <UserMenu />
          <ItemFormModal onItemAdded={handleItemAdded} />
          <h1 className="text-2xl font-bold">Inventário</h1>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredInventory.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={() => {
              useInventoryStore.getState().handleEditItem(item);
            }}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>
      <ItemEditModal />
    </div>
  );
}
