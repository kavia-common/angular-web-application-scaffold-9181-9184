import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TenantOption = {
  id: string;
  name: string;
};

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend_angular is being generated';

  /**
   * In a real app this list would usually come from an API call.
   * For this scaffold, keep it local and demonstrate the auto-default behavior.
   */
  readonly tenantOptions = signal<TenantOption[]>([
    { id: 'natco', name: 'NATCO' },
  ]);

  /**
   * Selected tenant id for the single-selection control.
   * Empty string means "no selection yet".
   */
  readonly selectedTenantId = signal<string>('');

  readonly selectedTenant = computed(() => {
    const id = this.selectedTenantId();
    return this.tenantOptions().find((t) => t.id === id) ?? null;
  });

  constructor() {
    // Auto-select the only tenant option if there is exactly one.
    // Also guards against invalid selection if the options list changes.
    effect(() => {
      const options = this.tenantOptions();
      const current = this.selectedTenantId();

      if (options.length === 1) {
        const only = options[0];
        if (current !== only.id) {
          this.selectedTenantId.set(only.id);
        }
        return;
      }

      // If multiple/zero options and current selection is no longer valid, clear it.
      if (current && !options.some((t) => t.id === current)) {
        this.selectedTenantId.set('');
      }
    });
  }

  // PUBLIC_INTERFACE
  onTenantChange(nextTenantId: string): void {
    /** Updates the selected tenant (single selection control). */
    this.selectedTenantId.set(nextTenantId);
  }
}
