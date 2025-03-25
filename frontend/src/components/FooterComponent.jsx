import React from 'react'

function FooterComponent() {
  return (
    <footer class="w-full bg-white/80 backdrop-blur-md border-t bg-gradient-to-t from-blue-500 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="space-y-4">
            <h3 class="text-sm font-semibold tracking-wider text-gray-900">Company</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
            </ul>
          </div>
          <div class="space-y-4">
            <h3 class="text-sm font-semibold tracking-wider text-gray-900">Products</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div class="space-y-4">
            <h3 class="text-sm font-semibold tracking-wider text-gray-900">Support</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms</a></li>
            </ul>
          </div>
          <div class="space-y-4">
            <h3 class="text-sm font-semibold tracking-wider text-gray-900">Contact</h3>
            <ul class="space-y-2">
              <li>
                <a href="mailto:contact@company.com"
                  class="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  contact@company.com
                </a>
              </li>
              <li class="flex space-x-4">
                <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">
                  <i class="fab fa-github h-5 w-5"></i>
                </a>
                <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">
                  <i class="fab fa-twitter h-5 w-5"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t">
          <p class="text-sm text-gray-600 text-center">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default FooterComponent