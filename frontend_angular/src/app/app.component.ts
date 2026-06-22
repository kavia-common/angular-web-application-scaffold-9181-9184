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
        // Important: only default when there is no current selection.
        // This mirrors a "prefill" behavior and avoids clobbering an explicit selection
        // (or a subsequent patchValue coming from an edit/prefill flow).
        if (!current) {
          // Schedule on microtask to avoid "changed after checked" timing issues in
          // real-world forms where options and the UI control initialize asynchronously.
          Promise.resolve().then(() => this.selectedTenantId.set(only.id));
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
