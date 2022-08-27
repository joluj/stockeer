import { Injectable } from '@angular/core';
import {
  AndroidPermissionResponse,
  AndroidPermissions,
} from '@awesome-cordova-plugins/android-permissions/ngx';

export type Permission = 'CAMERA';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  constructor(private readonly androidPermissions: AndroidPermissions) {}

  /**
   * Checks a permission
   * @return true, if the permission is granted
   */
  async hasPermission(permission: Permission): Promise<boolean> {
    const androidPermission = this.androidPermissions.PERMISSION[permission];
    const { hasPermission } = await this.androidPermissions
      .checkPermission(androidPermission)
      .catch((error) => {
        console.error(error); // TODO Error Handling

        return { hasPermission: false };
      });

    return hasPermission;
  }

  /**
   * Tries to get a permission
   * @return true, if it was successful
   */
  async getPermission(permission: Permission) {
    if (await this.hasPermission(permission)) {
      return;
    }
    const androidPermission = this.androidPermissions.PERMISSION[permission];

    const { hasPermission }: AndroidPermissionResponse =
      await this.androidPermissions
        .requestPermission(androidPermission)
        .catch((e) => {
          // TODO Error handling
          console.error(e);
          return { hasPermission: false };
        });

    return hasPermission;
  }
}
