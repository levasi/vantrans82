<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-600 mb-1">Total Messages</p>
                    <p class="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div class="p-3 bg-blue-100 rounded-lg">
                    <Mail class="w-6 h-6 text-blue-900" />
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-600 mb-1">Pending Requests</p>
                    <p class="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div class="p-3 bg-orange-100 rounded-lg">
                    <Clock class="w-6 h-6 text-orange-900" />
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-600 mb-1">Active Services</p>
                    <p class="text-3xl font-bold text-gray-900">4</p>
                </div>
                <div class="p-3 bg-green-100 rounded-lg">
                    <Truck class="w-6 h-6 text-green-900" />
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-600 mb-1">Website Status</p>
                    <p class="text-3xl font-bold text-green-600">Online</p>
                </div>
                <div class="p-3 bg-green-100 rounded-lg">
                    <CheckCircle class="w-6 h-6 text-green-900" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Mail, Clock, Truck, CheckCircle } from 'lucide-vue-next'
</script>
