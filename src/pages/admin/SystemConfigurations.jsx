import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    Settings, List, Users, Box, Plus, Search,
    Edit2, Trash2, CheckCircle, XCircle, ChevronRight,
    ArrowLeft, Save, X
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useSystemOptions } from '../../hooks/useSystemOptions';

export default function SystemConfigurations() {
    const [activeTab, setActiveTab] = useState('options');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Tabs configuration
    const tabs = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'options', label: 'Dropdown Options', icon: List },
        { id: 'roles', label: 'Roles & Permissions', icon: Users },
        { id: 'modules', label: 'Modules', icon: Box },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">System Configurations</h1>
                <p className="text-slate-500">Manage global system settings, dropdowns, and modules.</p>
            </div>

            {/* Tabs Header */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSelectedCategory(null);
                            }}
                            className={`
                                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                                ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                            `}
                        >
                            <tab.icon className={`
                                -ml-0.5 mr-2 h-5 w-5
                                ${activeTab === tab.id ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-500'}
                            `} />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'options' && (
                    <DropdownOptionsTab
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                )}
                {activeTab === 'general' && <PlaceholderTab name="General Settings" />}
                {activeTab === 'roles' && <PlaceholderTab name="Roles & Permissions" />}
                {activeTab === 'modules' && <PlaceholderTab name="System Modules" />}
            </div>
        </div>
    );
}

// Placeholder for future tabs
function PlaceholderTab({ name }) {
    return (
        <div className="text-center py-20 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
            <Settings className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-2 text-sm font-medium text-slate-900">{name}</h3>
            <p className="mt-1 text-sm text-slate-500">This module is coming soon.</p>
        </div>
    );
}

// Main Options Tab Component
function DropdownOptionsTab({ selectedCategory, onSelectCategory }) {
    const { options: allOptions, loading, refresh } = useSystemOptions();
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOption, setEditingOption] = useState(null);

    // Process options into categories
    useEffect(() => {
        if (allOptions) {
            const cats = Object.keys(allOptions).map(key => {
                // Filter out placeholder options
                const realOptions = Object.entries(allOptions[key])
                    .filter(([value]) => value !== '_init_')
                    .map(([value, label]) => ({ value, label }));

                return {
                    id: key,
                    name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    count: realOptions.length,
                    options: realOptions
                };
            });
            setCategories(cats);
        }
    }, [allOptions]);

    if (loading) return <div className="p-8 text-center text-slate-500">Loading configurations...</div>;

    // Detail View (Manage Category)
    if (selectedCategory) {
        return (
            <>
                <CategoryDetailView
                    category={selectedCategory}
                    onBack={() => onSelectCategory(null)}
                    onAdd={() => { setEditingOption(null); setIsModalOpen(true); }}
                    onEdit={(opt) => { setEditingOption(opt); setIsModalOpen(true); }}
                />
                {isModalOpen && (
                    <OptionModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        option={editingOption}
                        category={selectedCategory}
                        onSave={async (data) => {
                            try {
                                await window.axios.post('/api/options', data);
                                setIsModalOpen(false);
                                refresh();
                            } catch (error) {
                                console.error('Failed to save option:', error);
                                const errorMessage = error.response?.data?.message ||
                                    error.response?.data?.errors ?
                                    Object.values(error.response.data.errors).flat().join('\n') :
                                    'Failed to save option';
                                alert(errorMessage);
                            }
                        }}
                    />
                )}
            </>
        );
    }

    // Grid View (List Categories)
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <div className="relative max-w-xs w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search categories..."
                    />
                </div>
                <Button icon={Plus} variant="dark" onClick={() => { setEditingOption(null); setIsModalOpen(true); }}>Add Category</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <Card
                        key={cat.id}
                        className="hover:shadow-md transition-shadow cursor-pointer group"
                        onClick={() => onSelectCategory(cat)}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <List className="h-6 w-6 text-blue-600" />
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                    {cat.count} options
                                </span>
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-slate-900">{cat.name}</h3>
                            <p className="mt-1 text-sm text-slate-500">
                                System key: <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">{cat.id}</code>
                            </p>
                            <div className="mt-6 flex items-center text-sm text-blue-600 font-medium group-hover:text-blue-700">
                                Manage Options <ChevronRight className="ml-1 h-4 w-4" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Modal for Adding/Editing Options */}
            {isModalOpen && (
                <OptionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    option={editingOption}
                    category={selectedCategory}
                    onSave={async (data) => {
                        try {
                            await window.axios.post('/api/options', data);
                            setIsModalOpen(false);
                            refresh();
                        } catch (error) {
                            console.error('Failed to save option:', error);
                            const errorMessage = error.response?.data?.message ||
                                error.response?.data?.errors ?
                                Object.values(error.response.data.errors).flat().join('\n') :
                                'Failed to save option';
                            alert(errorMessage);
                        }
                    }}
                />
            )}
        </div>
    );
}

// Category Detail View
function CategoryDetailView({ category, onBack, onAdd, onEdit }) {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-500" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{category.name}</h2>
                        <p className="text-sm text-slate-500">Managing options for <code className="text-xs">{category.id}</code></p>
                    </div>
                </div>
                <Button icon={Plus} onClick={onAdd}>Add</Button>
            </div>

            <Card className="overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Label</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value (Code)</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {category.options.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-slate-500">
                                    No options found. Click "Add" to create one.
                                </td>
                            </tr>
                        ) : (
                            category.options.map((opt, idx) => (
                                <tr key={opt.value} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{opt.label}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{opt.value}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => onEdit(opt)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

// Modal Component
function OptionModal({ isOpen, onClose, option, category, onSave }) {
    const [formData, setFormData] = useState({
        category_name: '', // For display only in category creation
        category: category ? category.id : '',
        label: '',
        value: '',
        sort_order: 0,
        is_active: true
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (option) {
            // Editing existing option
            setFormData({
                category: category ? category.id : '',
                label: option.label,
                value: option.value,
                sort_order: option.sort_order || 0,
                is_active: option.is_active !== undefined ? option.is_active : true
            });
        } else if (category) {
            // Adding new option to existing category
            const maxSortOrder = category.options.reduce((max, opt) => {
                const sortOrder = opt.sort_order || 0;
                return sortOrder > max ? sortOrder : max;
            }, 0);

            setFormData(prev => ({
                ...prev,
                category: category.id,
                sort_order: maxSortOrder + 1,
                is_active: true
            }));
        } else {
            // Creating new category
            setFormData(prev => ({
                ...prev,
                category_name: '',
                category: '',
                label: '',
                value: '',
                sort_order: 0,
                is_active: true
            }));
        }
    }, [option, category]);

    // Auto-generate key from category name
    const handleCategoryNameChange = (name) => {
        const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
        setFormData(prev => ({
            ...prev,
            category_name: name,
            category: key
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // If creating a new category, send placeholder option
        if (!category && !option) {
            const submitData = {
                category: formData.category,
                label: 'System Init',
                value: '_init_',
                is_active: false,
                sort_order: 0
            };
            await onSave(submitData);
        } else {
            // Exclude category_name from submission
            const { category_name, ...submitData } = formData;
            await onSave(submitData);
        }
        setIsLoading(false);
    };

    if (!isOpen) return null;

    const isCategoryMode = !category && !option;

    return createPortal(
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 transition-opacity bg-slate-900/50 backdrop-blur-sm"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-10">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">
                                    {isCategoryMode ? 'Create New Category' : (option ? 'Edit Option' : `Add Option to ${category?.name}`)}
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <form id="option-form" onSubmit={handleSubmit}>

                                        {/* Category Creation Fields */}
                                        {isCategoryMode && (
                                            <div className="bg-slate-50 p-4 rounded-md mb-4 border border-slate-200">
                                                <h4 className="text-sm font-medium text-slate-700 mb-3 uppercase tracking-wider">Category Details</h4>
                                                <div className="space-y-4">
                                                    <Input
                                                        id="category_name"
                                                        label="Category Name"
                                                        placeholder="e.g. Flight Status"
                                                        value={formData.category_name}
                                                        onChange={(e) => handleCategoryNameChange(e.target.value)}
                                                        required
                                                    />
                                                    {/* System key auto-generated in background */}
                                                    <input type="hidden" id="category" value={formData.category} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Option Fields - Only show if NOT creating a new category */}
                                        {!isCategoryMode && (
                                            <div className="border-t border-slate-200 pt-4">
                                                <div className="space-y-4">
                                                    <Input
                                                        id="label"
                                                        label="Label"
                                                        placeholder="e.g. Active"
                                                        value={formData.label}
                                                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                                        required
                                                    />

                                                    <Input
                                                        id="value"
                                                        label="Value (Code)"
                                                        placeholder="e.g. active"
                                                        value={formData.value}
                                                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                                        required
                                                        disabled={!!option}
                                                    />

                                                    {/* Status Toggle */}
                                                    <div className="flex items-center justify-between py-2">
                                                        <label htmlFor="is_active" className="block text-sm font-medium text-slate-700">
                                                            Status
                                                        </label>
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, is_active: !prev.is_active }))}
                                                            className={`
                                                                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                                                ${formData.is_active ? 'bg-green-500' : 'bg-slate-200'}
                                                            `}
                                                            role="switch"
                                                            aria-checked={formData.is_active}
                                                        >
                                                            <span className="sr-only">Use setting</span>
                                                            <span
                                                                aria-hidden="true"
                                                                className={`
                                                                    pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                                                                    ${formData.is_active ? 'translate-x-5' : 'translate-x-0'}
                                                                `}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div className="text-xs text-slate-500 text-right">
                                                        {formData.is_active ? 'Active' : 'Inactive'}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <Button
                            type="submit"
                            form="option-form"
                            variant="dark"
                            className="w-full sm:w-auto sm:ml-3"
                            isLoading={isLoading}
                        >
                            Save
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="mt-3 w-full sm:mt-0 sm:w-auto"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
